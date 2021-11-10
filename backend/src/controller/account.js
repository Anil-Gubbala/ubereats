const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../dbConnector");
const { makeRequest } = require("../kafka/client");
const RESTAURANT = require("../sql/restaurantSql");
const USER = require("../sql/userSql");
const config = require("../utils/const");
const { kafkaRequest, topics } = require("./kafkaRequest");

const saltRounds = 10;

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

const registerRestaurant = (req, res, password) => {
  const {
    restaurantName: name,
    email,
    location,
    latitude,
    longitude,
  } = req.body;
  kafkaRequest(
    topics.request,
    "registerRestaurant",
    { name, email, password, location, latitude, longitude },
    (err, result) => {
      if (err) {
        sendError(
          res,
          409,
          err.code === 11000 ? "email already registered" : err.code
        );
      } else {
        res.status(200).send({ _id: result._id });
      }
    }
  );
  // db.query(
  //   RESTAURANT.SIGNUP,
  //   [restaurantName, email, hash, location, latitude, longitude],
  //   (err1) => {
  //     if (err1) {
  //       sendError(
  //         res,
  //         409,
  //         err1.errno === 1062 ? "email already registered" : err1.code
  //       );
  //     } else {
  //       res.status(200).send({ success: true });
  //     }
  //   }
  // );
};

const registerUser = (req, res, password) => {
  const { name, email } = req.body;
  kafkaRequest(
    topics.request,
    "registerUser",
    { name, email, password },
    (err, result) => {
      if (err) {
        sendError(
          res,
          409,
          err.code === 11000 ? "email already registered" : err.code
        );
      } else {
        res.status(200).send({ _id: result._id });
      }
    }
  );
  // db.query(USER.SIGNUP, [req.body.name, req.body.email, hash], (err1) => {
  //   if (err1) {
  //     sendError(
  //       res,
  //       409,
  //       err1.errno === 1062 ? "email already registered" : err1.code
  //     );
  //   } else {
  //     res.status(200).send({ success: true });
  //   }
  // });
};

const signup = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      sendError(res, 404, err.code);
      return;
    }
    if (req.body.accountType === "1") {
      registerRestaurant(req, res, hash);
    } else {
      registerUser(req, res, hash);
    }
  });
  // res.status(500).send();
};

// const setSession = (req, res, email, isCustomer, status) => {
//   res.cookie("ubereats273", JSON.stringify({ customer: isCustomer, email }), {
//     maxAge: 2 * 60 * 60 * 1000,
//     httpOnly: false,
//     // sameSite: 'none',
//   });
//   req.session.user = {
//     email,
//     isCustomer,
//   };
//   res.status(200).send({
//     email,
//     isCustomer,
//     status,
//   });
// };

const signin = (req, res) => {
  // if (req.session.user) {
  //   res.cookie(
  //     "ubereats273",
  //     JSON.stringify({
  //       customer: req.session.user.isCustomer,
  //       email: req.session.email,
  //     }),
  //     {
  //       maxAge: 2 * 60 * 60 * 1000,
  //       httpOnly: false,
  //     }
  //   );
  //   res.send(req.session.user);
  //   return;
  // }

  const { customer: isCustomer, email } = req.body;
  let sql = USER.PASSWORD;
  if (!req.body.customer) {
    sql = RESTAURANT.PASSWORD;
  }

  kafkaRequest(
    topics.request,
    "getPassword",
    { isCustomer, email },
    (err, result) => {
      if (err) {
        sendError(res, 404, err.code);
      } else if (result) {
        bcrypt.compare(
          req.body.password,
          result.password,
          (error, response) => {
            if (response) {
              // setSession(
              //   req,
              //   res,
              //   req.body.email,
              //   req.body.customer,
              //   result[0].status
              // );
              const userInfo = {
                email: req.body.email,
                isCustomer: req.body.customer,
                status: result.status,
              };
              const token = jwt.sign(userInfo, config.secret, {
                expiresIn: 1008000,
              });
              res.status(200).send({ token: `JWT ${token}`, user: userInfo });
            } else {
              res
                .status(404)
                .send({ err: "Wrong username/password combination!" });
            }
          }
        );
      } else {
        res.status(404).send({ err: "User doesn't exist" });
      }
    }
  );
  // db.query(sql, req.body.email, (err, result) => {
  //   if (err) {
  //     sendError(res, 404, err.code);
  //     return;
  //   }
  //   if (result.length > 0) {
  //     bcrypt.compare(
  //       req.body.password,
  //       result[0].password,
  //       (error, response) => {
  //         if (response) {
  //           // setSession(
  //           //   req,
  //           //   res,
  //           //   req.body.email,
  //           //   req.body.customer,
  //           //   result[0].status
  //           // );
  //           const userInfo = {
  //             email: req.body.email,
  //             isCustomer: req.body.customer,
  //             status: result[0].status,
  //           };
  //           const token = jwt.sign(userInfo, config.secret, {
  //             expiresIn: 1008000,
  //           });
  //           res.status(200).send({ token: `JWT ${token}`, user: userInfo });
  //         } else {
  //           res
  //             .status(404)
  //             .send({ err: "Wrong username/password combination!" });
  //         }
  //       }
  //     );
  //   } else {
  //     res.status(404).send({ err: "User doesn't exist" });
  //   }
  // });
};

const signout = (req, res) => {
  // if (req.session.user) {
  //   req.session.destroy();
  //   req.session = null;
  //   console.log(res.cookie);
  //   res.clearCookie("ubereats273", {
  //     path: "/",
  //   });
  //   res.send();
  // } else {
  //   res.send();
  // }
  if (req.user) {
    req.logout();
    res.send();
  } else {
    res.send();
  }
};

module.exports = { signup, signin, signout };
