const db = require('../dbConnector');
const RESTAURANT = require('../sql/restaurantSql');
const { response } = require('../utils/response');

const getRestaurantInfo = (req, res) => {
  if (!req.session.user) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    let { email } = req.session.user;
    if (req.session.user.isCustomer) {
      email = req.query.id;
    }
    db.query(RESTAURANT.ALL_INFO, email, (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        response.error(res, 404, 'Record not found');
      }
    });
  }
};

const getDishes = (req, res) => {
  if (!req.session.user) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    let { email } = req.session.user;
    if (req.session.user.isCustomer) {
      email = req.query.id;
    }
    db.query(RESTAURANT.DISHES, email, (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        response.error(res, 404, 'Record not found');
      }
    });
  }
};

const addDish = (req, res) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      RESTAURANT.ADD_DISH,
      [
        req.session.user.email,
        body.name,
        body.ingredients,
        body.image,
        body.price,
        body.description,
        body.category,
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

const updateDish = (req, res) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      RESTAURANT.UPDATE_DISH,
      [
        body.name,
        body.ingredients,
        body.image,
        body.price,
        body.description,
        body.category,
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

const updateRestaurantInfo = (req, res) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      RESTAURANT.UPDATE_RESTAURANT,
      [
        body.name,
        body.location,
        body.contact,
        body.picture,
        body.description,
        body.start,
        body.end,
        req.session.user.email,
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

const getRestaurantOrders = (req, res) => {
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      RESTAURANT.GET_RESTAURANT_ORDERS,
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

const updateOrderStatus = (req, res) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(
      RESTAURANT.UDPATE_ORDER_STATUS,
      [body.status, body.order_id],
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
  addDish,
  updateDish,
  updateRestaurantInfo,
  getRestaurantOrders,
  updateOrderStatus,
};
