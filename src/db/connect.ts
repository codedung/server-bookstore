import { createPool } from "mysql2/promise";
import "dotenv/config";

const { DB_HOST, DB_PASSWORD, DB_USER, DB_DATABASE } = process.env;

export const pool = createPool({
  host: DB_HOST || "localhost",
  user: DB_USER || "root",
  password: DB_PASSWORD,
  database: DB_DATABASE,
  connectionLimit: 10,
  dateStrings: true
});
