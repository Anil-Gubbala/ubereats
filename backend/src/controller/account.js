const bcrypt = require('bcrypt');
const db = require('../dbConnector');
const RESTAURANT = require('../sql/restaurantSql');

const saltRounds = 10;

const sendError = (res, status, code) => {
  res.status(status).send({ err: code });
};

const registerRestaurant = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      sendError(res, 404, err.code);
      return;
    }
    db.query(
      RESTAURANT.SIGNUP,
      [req.body.restaurantName, req.body.email, hash, req.body.address],
      (err1) => {
        if (err1) {
          sendError(
            res,
            409,
            err1.errno === 1062 ? 'email already registered' : err1.code
          );
        } else {
          res.status(200).send({ success: true });
        }
      }
    );
  });
};

const setSession = (req, res, email, isCustomer) => {
  res.cookie('customer', isCustomer, {
    maxAge: 900000,
    httpOnly: false,
  });
  req.session.user = {
    email,
    isCustomer,
  };
  res.status(200).send({
    email,
    isCustomer,
  });
};

const signin = (req, res) => {
  if (req.session.user) {
    res.cookie('customer', req.session.user.isCustomer, {
      maxAge: 900000,
      httpOnly: false,
    });
    res.send(req.session.user);
    return;
  }
  let sql = RESTAURANT.CHECK_USER;
  if (!req.body.customer) {
    sql = RESTAURANT.CHECK_USER;
  }
  db.query(sql, req.body.email, (err, result) => {
    if (err) {
      sendError(res, 404, err.code);
      return;
    }
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password,
        result[0].password,
        (error, response) => {
          if (response) {
            setSession(req, res, req.body.email, req.body.customer);
          } else {
            res
              .status(404)
              .send({ err: 'Wrong username/password combination!' });
          }
        }
      );
    } else {
      res.status(404).send({ err: "User doesn't exist" });
    }
  });
};

const signout = (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    req.session = null;
    console.log(res.cookie);
    res.clearCookie('customer', {
      path: '/',
    });
    res.send();
  } else {
    res.send();
  }
};

module.exports = { registerRestaurant, signin, signout };
