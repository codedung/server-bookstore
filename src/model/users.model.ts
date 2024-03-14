export type RegisteDataType = (string | undefined)[];
export interface IUser {
  idx: number;
  id: string;
  password: string;
  name: string;
  slat: string;
  createAt: string;
  length?: number;
}

export interface ISignupData {
  id: string;
  password: string;
  name: string;
}

export interface IMatchResultData {
  success: boolean;
  msg: string;
  data: IUser;
}

//query
export const MATCH_QUERY = `SELECT * FROM users WHERE id = ?`;
export const REGISTE_QUERY = `INSERT INTO users (id, password, name, salt) values ( ?,?,?,? )`;
