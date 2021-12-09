const db = require("../dbConnector");
const RESTAURANT = require("../sql/restaurantSql");
const { response } = require("../utils/response");

const getRestaurantInfo = (req, _res, _rej) => {
  if (!req.session.user) {
    _rej("Unauthorized");
    // response.unauthorized(res, "unauthorized access");
  } else {
    let { email } = req.session.user;
    if (req.session.user.isCustomer) {
      email = req.query.id;
    }
    db.query(RESTAURANT.ALL_INFO, email, (err, result) => {
      if (err) {
        _rej(err.code);
        // response.error(res, 500, err.code);
        return;
      }
      if (result.length > 0) {
        _res(result[0]);
        // res.send(result);
      } else {
        _rej("record not exist");
        // response.error(res, 404, "Record not found");
      }
    });
  }
};

const getDishes = (req, _res, _rej) => {
  const { type } = req.query;
  if (!req.session.user) {
    _rej("unauthoirzed");
    // response.unauthorized(res, "unauthorized access");
  } else {
    let query = RESTAURANT.DISHES;
    let { email } = req.session.user;
    if (req.session.user.isCustomer) {
      email = req.query.id;
      if (type !== -1) {
        query = RESTAURANT.DISHES_WITH_FILTER;
      }
    }
    db.query(query, [email, type], (err, result) => {
      if (err) {
        _rej(err.code);
        // response.error(res, 500, err.code);
        return;
      }
      _res(result);
      // res.send(result);
    });
  }
};

const createDish = (req, _res, _rej) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    _rej("unauthorized");
    // response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      RESTAURANT.ADD_DISH,
      [
        req.session.user.email,
        body.name,
        body.ingredients,
        body.picture,
        body.price,
        body.description,
        body.category,
        body.type,
      ],
      (err, result) => {
        if (err) {
          _rej(err.code);
          // response.error(res, 500, err.code);
          return;
        }
        _res({ success: true });
        // res.send();
      }
    );
  }
};

const updateDish = (req, res) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      RESTAURANT.UPDATE_DISH,
      [
        body.name,
        body.ingredients,
        body.picture,
        body.price,
        body.description,
        body.category,
        body.type,
        req.session.user.email,
        body.originalName,
      ],
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
          return;
        }
        res.send();
      }
    );
  }
};

const updateRestaurantInfo = (req, _res, _rej) => {
  const {
    name,
    location,
    contact,
    picture,
    description,
    start,
    end,
    latitude,
    longitude,
    delivery,
  } = req.body;
  if (!req.session.user || req.session.user.isCustomer) {
    _rej("unauthorized");
    // response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      RESTAURANT.UPDATE_RESTAURANT,
      [
        name,
        location,
        contact,
        picture,
        description,
        start,
        end,
        latitude,
        longitude,
        delivery,
        req.session.user.email,
      ],
      (err, result) => {
        if (err) {
          _rej(err.code);
          // response.error(res, 500, err.code);
          return;
        }
        _res({ success: true });
        // res.send();
      }
    );
  }
};

const getRestaurantOrders = (req, _res, _rej) => {
  const { filter } = req.query;
  if (!req.session.user || req.session.user.isCustomer) {
    // response.unauthorized(res, "unauthorized access");
    _rej("unauthorized");
  } else {
    db.query(
      filter === 0
        ? RESTAURANT.GET_RESTAURANT_ORDERS_NEW
        : RESTAURANT.GET_RESTAURANT_ORDERS_OLD,
      [req.session.user.email, filter],
      (err, result) => {
        if (err) {
          _rej(err.code);
          // response.error(res, 500, err.code);
          return;
        }
        _res(result);
        // res.send(result);
      }
    );
  }
};

const updateOrderStatus = (req, _res, _rej) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    _rej("unauthorized");
    // response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      RESTAURANT.UDPATE_ORDER_STATUS,
      [body.status, body.order_id],
      (err, result) => {
        if (err) {
          _rej(err.code);
          // response.error(res, 500, err.code);
          return;
        }
        _res({ success: true });
        // res.send();
      }
    );
  }
};

const deleteDish = (req, res) => {
  const { name } = req.body;
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      RESTAURANT.DELETE_DISH,
      [req.session.user.email, name],
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
          return;
        }
        res.send();
      }
    );
  }
};

module.exports = {
  getRestaurantInfo,
  getDishes,
  createDish,
  updateDish,
  updateRestaurantInfo,
  getRestaurantOrders,
  updateOrderStatus,
  deleteDish,
};
