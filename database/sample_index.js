const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 125,
  host: 'localhost',
  user: '',
  password: '',
  database: 'products'
});

const getConnection = (cb) => {
  pool.getConnection((err, connection) => {
    cb(err, connection);
  });
}

module.exports = getConnection;
