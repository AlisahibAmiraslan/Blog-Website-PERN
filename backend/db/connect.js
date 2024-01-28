const Pool = require("pg").Pool;
require("dotenv").config();

// for localhost

// const pool = new Pool({
//   user: process.env.POSTGRE_USER,
//   password: process.env.POSTGRE_PASSWORD,
//   host: process.env.POSTGRE_HOST,
//   port: process.env.POSTGRE_PORT,
//   database: process.env.POSTGRE_DATABASE,
// });

// for vercel

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

module.exports = pool;
