const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const router = require("./src/router");
const db = require("./src/dbConnector");
const passport = require("passport");

const startServer = require("./src/server");
const { auth, checkAuth } = require("./src/utils/auth");

const app = express();
app.use(
  session({
    key: "ubereats",
    secret: "lab1",
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

// ---------------------RECHECK----------------------
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// app.use(checkAuth);
// app.use((err, req, res, next) => {
//   const whiteList = ["/signin"];
//   console.log("error handler");
//   if (whiteList.includes(req.url)) {
//     next();
//   }
// });
app.use("/", router);
auth();

// db.connect((err) => {
//   if (err) {
//     throw new Error(`Database connection error  occured : ${err}`);
//   }
//   console.log('Database connection established');
// });

if (!module.parent) {
  app.listen(4000, () => {
    console.log("running server");
  });
}

module.exports = app;
