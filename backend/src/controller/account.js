const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../dbConnector");
const RESTAURANT = require("../sql/restaurantSql");
const USER = require("../sql/userSql");

const saltRounds = 10;

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

const registerRestaurant = (req, hash, _res, _rej) => {
  const { restaurantName, email, location, latitude, longitude } = req.body;
  db.query(
    RESTAURANT.SIGNUP,
    [restaurantName, email, hash, location, latitude, longitude],
    (err1) => {
      if (err1) {
        // err1.errno === 1062
        _rej("email already registered");
        // : _rej(err1.code);
        // sendError(
        //   res,
        //   409,
        //   err1.errno === 1062 ? "email already registered" : err1.code
        // );
      } else {
        // res.status(200).send({ success: true });
        _res({ success: true });
      }
    }
  );
};

const registerUser = (req, hash, _res, _rej) => {
  db.query(USER.SIGNUP, [req.body.name, req.body.email, hash], (err1) => {
    if (err1) {
      // sendError(
      _rej("email already registered");
      // res,
      // 409,
      // err1.errno === 1062 ? "email already registered" : err1.code
      // );
    } else {
      _res({ success: true });
      // res.status(200).send({ success: true });
    }
  });
};

const signup = (req, _res, _rej) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      _rej("Hashing Error");
      // sendError(res, 404, err.code);
      return;
    }
    if (req.body.accountType === "1") {
      registerRestaurant(req, hash, _res, _rej);
    } else {
      registerUser(req, hash, _res, _rej);
    }
  });
};

const setSession = (req, res, email, isCustomer, status) => {
  res.cookie("ubereats273", JSON.stringify({ customer: isCustomer, email }), {
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: false,
    // sameSite: 'none',
  });
  req.session.user = {
    email,
    isCustomer,
  };
  res.status(200).send({
    email,
    isCustomer,
    status,
  });
};

const signin = (req, _res, _rej) => {
  console.log(req);
  let sql = USER.PASSWORD;
  if (!req.body.customer) {
    sql = RESTAURANT.PASSWORD;
  }
  db.query(sql, req.body.email, (err, result) => {
    if (err) {
      _rej(err.code);
      // sendError(res, 404, err.code);
      // return;
    }
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password,
        result[0].password,
        (error, response) => {
          if (response) {
            _res({
              email: req.body.email,
              isCustomer: req.body.customer,
              status: result[0].status,
              token: jwt.sign(
                { email: req.body.email, isCustomer: req.body.customer },
                "lab3"
              ),
            });
            return;
          }
          _rej("Wrong username/password combination!");
        }
      );
    } else {
      _rej("User doesn't exist");
      // res.status(404).send({ err: "User doesn't exist" });
    }
  });
};

const signout = (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    req.session = null;
    console.log(res.cookie);
    res.clearCookie("ubereats273", {
      path: "/",
    });
    res.send();
  } else {
    res.send();
  }
};

module.exports = { signup, signin, signout };
