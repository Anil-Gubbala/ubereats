const db = require("../dbConnector");
const COMMON = require("../sql/commonSql");
const CUSTOMER = require("../sql/customer");
const RESTAURANT = require("../sql/restaurantSql");
const { response } = require("../utils/response");

const placeOrder = (req, res) => {
  const { restaurantId, addressId, delivery } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      CUSTOMER.CART_INSERT,
      [req.session.user.email, restaurantId, addressId, delivery],
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
  console.log(req.session.user);
  const { filter, deliveryType } = req.query;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      CUSTOMER.GET_ORDERS,
      [req.session.user.email, deliveryType, filter],
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

const getUserProfile = (req, res) => {
  if (!req.session.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    const email = req.session.user.isCustomer
      ? req.session.user.email
      : req.query.email;
    db.query(CUSTOMER.GET_PROFILE1, [email, email, email], (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      res.send(result);
    });
  }
};

const updateUserInfo = (req, res) => {
  const {
    contact,
    email,
    dob,
    location,
    name,
    nickname,
    picture,
    about,
    country,
    latitude,
    longitude,
  } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
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
          [
            email,
            picture,
            contact,
            dob,
            nickname,
            about,
            picture,
            contact,
            dob,
            nickname,
            about,
          ],
          (err1, result1) => {
            if (err1) {
              response.error(res, 500, err1.code);
              return;
            }
            db.query(
              CUSTOMER.UPDATE_USER_ADDRESS,
              [
                email,
                location,
                country,
                latitude,
                longitude,
                location,
                country,
                latitude,
                longitude,
              ],
              (err2, result2) => {
                if (err2) {
                  response.error(res, 500, err2.code);
                  return;
                }
                res.send();
              }
            );
          }
        );
      }
    );
  }
};

const addToFavorites = (req, res) => {
  const { email } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      CUSTOMER.FAVORITE_ADD,
      [req.session.user.email, email],
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
          return;
        }
        res.send({ email });
      }
    );
  }
};

const removeFromFavorites = (req, res) => {
  const { email } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      CUSTOMER.FAVORITE_REMOVE,
      [req.session.user.email, email],
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
          return;
        }
        res.send({ email });
      }
    );
  }
};

const getFavorites = (req, res) => {
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(CUSTOMER.FAVORITE_GET, [req.session.user.email], (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      res.send(result);
    });
  }
};

const getAllAddresses = (req, res) => {
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      CUSTOMER.ADDRESSES_GET_ALL,
      [req.session.user.email],
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

const addNewAddress = (req, res) => {
  const { location, country, latitude, longitude } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      CUSTOMER.ADDRESSES_ADD_NEW,
      [req.session.user.email, location, country, latitude, longitude],
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

const getRestaurantDelivery = (req, res) => {
  if (!req.session.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      RESTAURANT.GET_RESTAURANT_DELIVERY,
      [req.query.email],
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

module.exports = {
  placeOrder,
  myOrders,
  getUserProfile,
  updateUserInfo,
  removeFromFavorites,
  addToFavorites,
  getFavorites,
  getAllAddresses,
  addNewAddress,
  getRestaurantDelivery,
};
