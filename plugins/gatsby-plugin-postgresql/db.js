module.exports = require("knex")({
  client: "pg",
  connection: {
    host: process.env.BDL_HOST,
    port: process.env.BDL_PORT,
    user: process.env.BDL_USER,
    password: process.env.BDL_PASSWORD,
    database: process.env.BDL_DATABASE,
  },
  pool: { min: 0, max: 5 },
});
