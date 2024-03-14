import { PoolOptions, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { PoolConnection } from "mysql2/promise";
import { AddQuery, SelectQuery } from "../db/query.util";
import { IUser, ISignupData, RegisteDataType } from "../model/users.model";
import { returnMessage } from "../util/common.util";
import crypto from "crypto";

import "dotenv/config";

export const matchUser = async (
  conn: PoolConnection,
  query: string,
  value: string
) => {
  try {
    const matchResult = await SelectQuery<IUser>(conn, query, value);
    if (typeof matchResult !== "undefined") {
      return returnMessage<IUser>(true, "Match success", matchResult);
    } else {
      throw new Error("Type ERROR");
    }
  } catch (err) {
    console.log(err);
    returnMessage(false, "MYSQL ERROR");
  }
};

export const registeUser = async (
  conn: PoolConnection,
  query: string,
  value: RegisteDataType
) => {
  try {
    let registeResult: any = await AddQuery<RegisteDataType>(
      conn,
      query,
      value
    );
    registeResult = JSON.parse(JSON.stringify(registeResult));
    if (registeResult.affectedRows > 0) {
      return returnMessage(true, "Insert success");
    } else {
      throw new Error("Insert ERROR");
    }
  } catch (err) {
    console.log(err);
    returnMessage(false, "MYSQL ERROR");
  }
};

export const hashPassword = (userData: ISignupData, matchData?: IUser) => {
  const { HASH_RANDOM, HASH_STRING, HASH_REPEAT, HASH_LAGNTH, HASH_ALGORISM } =
    process.env;
  let salt;
  if (matchData) {
    salt = matchData.slat;
  } else {
    salt = crypto
      .randomBytes(parseInt(HASH_RANDOM as string))
      .toString(HASH_STRING as BufferEncoding);
  }

  const hashPw: string = crypto
    .pbkdf2Sync(
      userData.password,
      salt,
      parseInt(HASH_REPEAT as string),
      parseInt(HASH_LAGNTH as string),
      HASH_ALGORISM as string
    )
    .toString(HASH_STRING as BufferEncoding);
  let hashResult;
  if (matchData) return (hashResult = { hashPw: hashPw });
  return (hashResult = { salt: salt, hashPw: hashPw });
};
