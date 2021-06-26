const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'products'
});

connection.connect();

module.exports = connection;
