const mysql = require('mysql');

// const db = mysql.createConnection({
//   user: 'root',
//   host: 'ubereatsdb.cauvszlanaze.us-east-2.rds.amazonaws.com',
//   password: '12345678',
//   database: 'ubereats',
//   port: '3306',
//   multipleStatements: true,
// });

const connector = mysql.createPool({
  user: 'root',
  host: 'ubereatsdb.cauvszlanaze.us-east-2.rds.amazonaws.com',
  password: '12345678',
  database: 'ubereats',
  port: '3306',
  multipleStatements: true,
});

const db = {
  query: (query, values, callback) => {
    connector.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      return connection.query(query, values, (err1, results) => {
        connection.release();
        if (err1) {
          console.log(err1);
          return callback(err1);
        }
        return callback(null, results);
      });
    });
  },
};

module.exports = db;
