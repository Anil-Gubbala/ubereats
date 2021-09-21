const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  host: 'ubereatsdb.cauvszlanaze.us-east-2.rds.amazonaws.com',
  password: '12345678',
  database: 'sys',
  port: '3306',
  multipleStatements: true,
});

module.exports = db;
