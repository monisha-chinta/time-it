const options = {}; // add options here
const pgp = require('pg-promise')(options);

// Database connection details;
const cn = {
  host: 'localhost', // 'localhost' is the default;
  port: 1234, // 5432 is the default;
  user: 'postgres',
  password: '152hsrdev',
  database: 'timeit'
};

const db = pgp(cn); // database instance;

module.exports = db;
