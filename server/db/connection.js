const options = {};
const pgp = require('pg-promise')(options);

// Database connection:
const cn = {
  host: 'ec2-107-21-205-25.compute-1.amazonaws.com',
  port: 5432,
  user: 'redpdisvsoldfr',
  password: '801fba483101970474743072df4f9b8f1f4ed1c83eaabb972bab503e7d641d4c',
  database: 'd2k592bhu7a41p'
};

const db = pgp(cn);

module.exports = db;
