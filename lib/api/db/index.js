const mysql = require("serverless-mysql");

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    timezone: "London",
  },
});

export const query = async (q) => {
  try {
    const results = await db.query(q);
    await db.end();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const escape = require("sql-template-strings");
