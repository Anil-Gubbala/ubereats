const db = require('../dbConnector');
const COMMON = require('../sql/commonSql');
const CUSTOMER = require('../sql/customer');
const { response } = require('../utils/response');

const placeOrder = (req, res) => {
  const { restaurantId, addressId } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      CUSTOMER.CART_INSERT,
      [req.session.user.email, restaurantId, addressId],
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
          return;
        }
        db.query(
          CUSTOMER.MOVE_TO_ORDER,
          [result.insertId, req.session.user.email, restaurantId],
          (err2, result2) => {
            if (err2) {
              response.error(res, 500, err2.code);
              return;
            }
            db.query(
              CUSTOMER.CLEAR_CART,
              [req.session.user.email, restaurantId],
              (err3, result3) => {
                if (err3) {
                  response.error(res, 500, err3.code);
                  return;
                }
                res.send(result3);
              }
            );
          }
        );
      }
    );
  }
};

const myOrders = (req, res) => {
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(CUSTOMER.GET_ORDERS, [req.session.user.email], (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      res.send(result);
    });
  }
};

const getUserProfile = (req, res) => {
  if (!req.session.user) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      CUSTOMER.GET_PROFILE,
      [req.session.user.isCustomer ? req.session.user.email : req.query.email],
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
          return;
        }
        res.send(result);
      }
    );
  }
};

const updateUserInfo = (req, res) => {
  const { contact, email, dob, location, name, nickname, picture, about } =
    req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      CUSTOMER.UPDATE_USER,
      [name, email, 1, req.session.user.email],
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
          return;
        }
        db.query(
          CUSTOMER.UPDATE_USER_DATA,
          [email, picture, contact, dob, nickname, location, about, email],
          (err1, result1) => {
            if (err1) {
              response.error(res, 500, err1.code);
              return;
            }
            res.send();
          }
        );
      }
    );
  }
};

module.exports = {
  placeOrder,
  myOrders,
  getUserProfile,
  updateUserInfo,
};
