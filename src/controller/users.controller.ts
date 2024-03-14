import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { pool } from "../db/connect";
import { hashPassword, matchUser, registeUser } from "../service/users.service";
import {
  ISignupData,
  MATCH_QUERY,
  REGISTE_QUERY,
  RegisteDataType
} from "../model/users.model";

export const userRegSignup = async (req: Request, res: Response) => {
  const userData: ISignupData = req.body;
  const conn = await pool.getConnection();

  const MATCH_VALUE: string = userData.id;
  const matchResult = await matchUser(conn, MATCH_QUERY, MATCH_VALUE);
  if (matchResult?.success && matchResult?.data?.length !== 0) {
    conn.beginTransaction();
    return res.status(StatusCodes.CONFLICT).end();
  }
  const hashResult = hashPassword(userData);

  if (hashResult) {
    const REGISTE_VALUE: RegisteDataType = [
      userData.id,
      hashResult.hashPw,
      userData.name,
      hashResult.salt
    ];
    const registeResult = await registeUser(conn, REGISTE_QUERY, REGISTE_VALUE);
    if (registeResult?.success) {
      return res.status(StatusCodes.OK).json({
        msg: registeResult.msg
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  }
  conn.release();
};
