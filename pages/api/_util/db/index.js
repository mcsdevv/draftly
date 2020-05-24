const { Client } = require("pg");
const escape = require("sql-template-strings");

export const query = async (text, params, callback) => {
  const db = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  await db.connect();
  const res = await db.query(text, params, callback);
  await db.end();
  return res;
};
