const options = {};
const pgp = require('pg-promise')(options);

// Database connection:
const cn = {
  host: 'localhost',
  port: 1234,
  user: 'postgres',
  password: '152hsrdev',
  database: 'timeit'
};

const db = pgp(cn);

module.exports = db;
