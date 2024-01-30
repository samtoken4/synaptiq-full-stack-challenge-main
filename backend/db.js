const { Pool } = require("pg");

const pool = new Pool({
  user: "db_user",
  host: "database",
  database: "database",
  password: "super_awesome_password",
  port: 5432,
});

module.exports = pool;
