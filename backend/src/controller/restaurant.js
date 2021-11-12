const db = require("../dbConnector");
const RESTAURANT = require("../sql/restaurantSql");
const { response } = require("../utils/response");
const { kafkaRequest, topics } = require("./kafkaRequest");

const getRestaurantInfo = (req, res) => {
  if (!req.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    let { email } = req.user;
    if (req.user.isCustomer) {
      email = req.query.id;
    }

    kafkaRequest(
      topics.request,
      "getRestaurantInfo",
      { email },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else if (result) {
          res.send(result);
        } else {
          response.error(res, 404, "Record not found");
        }
      }
    );

    // db.query(RESTAURANT.ALL_INFO, email, (err, result) => {
    //   if (err) {
    //     response.error(res, 500, err.code);
    //     return;
    //   }
    //   if (result.length > 0) {
    //     res.send(result);
    //   } else {
    //     response.error(res, 404, "Record not found");
    //   }
    // });
  }
};

const getDishes = (req, res) => {
  const { type } = req.query;
  if (!req.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    const query = {};
    // let query = RESTAURANT.DISHES;
    let { email } = req.user;
    if (req.user.isCustomer) {
      email = req.query.id;

      if (type !== "-1") {
        query.type = type;
        // query = RESTAURANT.DISHES_WITH_FILTER;
      }
    }
    query.email = email;
    kafkaRequest(topics.request, "getDishes", { ...query }, (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
      } else {
        res.send(result.dishes);
      }
    });
    // db.query(query, [email, type], (err, result) => {
    //   if (err) {
    //     response.error(res, 500, err.code);
    //     return;
    //   }
    //   res.send(result);
    // });
  }
};

const createDish = (req, res) => {
  const { name, ingredients, picture, price, description, category, type } =
    req.body;
  if (!req.user || req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "createDish",
      {
        query: { email: req.user.email },
        value: {
          name,
          ingredients,
          picture,
          price,
          description,
          category,
          type,
        },
      },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send();
        }
      }
    );

    // db.query(
    //   RESTAURANT.ADD_DISH,
    //   [
    //     req.user.email,
    //     body.name,
    //     body.ingredients,
    //     body.picture,
    //     body.price,
    //     body.description,
    //     body.category,
    //     body.type,
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     res.send();
    //   }
    // );
  }
};

const updateDish = (req, res) => {
  const {
    name,
    ingredients,
    picture,
    price,
    description,
    category,
    type,
    originalName,
  } = req.body;
  if (!req.user || req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "updateDish",
      {
        query: { email: req.user.email, dish: originalName },
        value: {
          name,
          ingredients,
          picture,
          price,
          description,
          category,
          type,
        },
      },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send();
        }
      }
    );

    // db.query(
    //   RESTAURANT.UPDATE_DISH,
    //   [
    //     body.name,
    //     body.ingredients,
    //     body.picture,
    //     body.price,
    //     body.description,
    //     body.category,
    //     body.type,
    //     req.user.email,
    //     body.originalName,
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     res.send();
    //   }
    // );
  }
};

const updateRestaurantInfo = (req, res) => {
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
  const { email } = req.user;
  if (!req.user || req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "updateRestaurantInfo",
      {
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
        email,
      },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else if (result) {
          res.send(result);
        } else {
          response.error(res, 404, "Record not found");
        }
      }
    );

    // db.query(
    //   RESTAURANT.UPDATE_RESTAURANT,
    //   [
    //     name,
    //     location,
    //     contact,
    //     picture,
    //     description,
    //     start,
    //     end,
    //     latitude,
    //     longitude,
    //     delivery,
    //     email,
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     res.send();
    //   }
    // );
  }
};

const getRestaurantOrders = (req, res) => {
  const filter = parseInt(req.query.filter, 10);
  if (!req.user || req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "getRestaurantOrders",
      { email: req.user.email, filter },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(result);
        }
      }
    );
    // db.query(
    //   filter === 0
    // ? RESTAURANT.GET_RESTAURANT_ORDERS_NEW
    //     : RESTAURANT.GET_RESTAURANT_ORDERS_OLD,
    //   [req.user.email, filter],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     res.send(result);
    //   }
    // );
  }
};

const updateOrderStatus = (req, res) => {
  const { body } = req;
  if (!req.user || req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "updateOrderStatus",
      { status: body.status, id: body.orderId },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send();
        }
      }
    );
    // db.query(
    //   RESTAURANT.UDPATE_ORDER_STATUS,
    //   [body.status, body.order_id],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     res.send();
    //   }
    // );
  }
};

const deleteDish = (req, res) => {
  const { name } = req.body;
  if (!req.user || req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "deleteDish",
      { email: req.user.email, name },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send();
        }
      }
    );
    // db.query(RESTAURANT.DELETE_DISH, [req.user.email, name], (err, result) => {
    //   if (err) {
    //     response.error(res, 500, err.code);
    //     return;
    //   }
    //   res.send();
    // });
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
