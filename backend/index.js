const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const router = require('./src/router');
const db = require('./src/dbConnector');
const startServer = require('./src/server');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// ---------------------RECHECK----------------------
app.use(cookieParser());
app.use(
  session({
    key: 'ubereats',
    secret: 'lab1',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

db.connect((err) => {
  if (err) {
    throw new Error(`Database connection error  occured : ${err}`);
  }
  console.log('Database connection created');
});

startServer();
