const mysql = require('mysql');

// const db = mysql.createConnection({
//   user: 'root',
//   host: 'ubereatsdb.cauvszlanaze.us-east-2.rds.amazonaws.com',
//   password: '12345678',
//   database: 'ubereats',
//   port: '3306',
//   multipleStatements: true,
// });

// const connector = mysql.createPool({
//   user: 'root',
//   host: 'ubereatsdb.cauvszlanaze.us-east-2.rds.amazonaws.com',
//   password: '12345678',
//   database: 'ubereats',
//   port: '3306',
//   // multipleStatements: true,
// });

const connector = mysql.createPool({
  user: 'auro',
  host: 'lab1237cmpe.cauvszlanaze.us-east-2.rds.amazonaws.com',
  password: 'gnQAMYArWg3rqfuntohZ',
  database: 'ubereats',
  port: '3306',
  multipleStatements: true,
});

const db = {
  query: (query, values, callback) => {
    connector.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      return callback(null, result);
    });
  },
};

// const db = mysql.createConnection({
//   user: 'auro',
//   host: 'lab1237cmpe.cauvszlanaze.us-east-2.rds.amazonaws.com',
//   password: 'gnQAMYArWg3rqfuntohZ',
//   database: 'ubereats',
//   port: '3306',
//   multipleStatements: true,
// });

module.exports = db;
