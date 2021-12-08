const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");
const router = require("./src/router");
const db = require("./src/dbConnector");

const startServer = require("./src/server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Koa, Lambda, etc.
    //
    // To find out the correct arguments for a specific integration,
    // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

    // Get the user token from the headers.
    const token = req.headers.authorization || "";
    // console.log(token);
    let user = null;
    try {
      user = jwt.verify(token, "lab3");
    } catch (error) {
      user = null;
    }
    // console.log(user);
    // console.log(user);
    // console.log(req.headers.authorization);
    // Try to retrieve a user with the token
    // const user = "getUser(token)";

    // Add the user to the context

    return { user };
  },
});

apolloServer.listen({ port: 5001 }).then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});

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

app.use("/", router);

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
