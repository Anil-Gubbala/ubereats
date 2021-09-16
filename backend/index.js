const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;


const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "ubereatsdb.cauvszlanaze.us-east-2.rds.amazonaws.com",
    password: "12345678",
    database: "sys",
    port: "3306",
    multipleStatements: true
  });

db.connect((err)=>{
  if(err) {
    throw 'Error occured' + err;
  }
  console.log('connection created');
})



const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
