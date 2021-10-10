const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const router = require('./src/router');
const db = require('./src/dbConnector');

const startServer = require('./src/server');

const app = express();
app.use(
  session({
    key: 'ubereats',
    secret: 'lab1',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);

app.use(
  cors({
    origin: 'http://3.142.131.218:3000',
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })
);
app.use(express.json());

// ---------------------RECHECK----------------------
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// db.connect((err) => {
//   if (err) {
//     throw new Error(`Database connection error  occured : ${err}`);
//   }
//   console.log('Database connection established');
// });

if (!module.parent) {
  app.listen(4000, () => {
    console.log('running server');
  });
}

module.exports = app;
