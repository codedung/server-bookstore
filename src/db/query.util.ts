import { PoolConnection } from "mysql2/promise";

export const SelectQuery = async <T>(
  conn: PoolConnection,
  query: string,
  value: string
) => {
  const [result] = await conn.query(query, value);
  return result as T;
};
export const AddQuery = async <T>(
  conn: PoolConnection,
  query: string,
  value: T
) => {
  const [result] = await conn.query(query, value);
  return result;
};
