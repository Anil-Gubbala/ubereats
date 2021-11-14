const db = require("../dbConnector");
const COMMON = require("../sql/commonSql");
const CUSTOMER = require("../sql/customer");
const RESTAURANT = require("../sql/restaurantSql");
const { response } = require("../utils/response");
const { topics, kafkaRequest } = require("./kafkaRequest");

const placeOrder = (req, res) => {
  const { restaurantId, address, delivery, instructions } = req.body;
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "placeOrder",
      { email: req.user.email, address, delivery, instructions },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(result);
        }
      }
    );
    // db.query(
    //   CUSTOMER.CART_INSERT,
    //   [req.user.email, restaurantId, addressId, delivery],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     db.query(
    //       CUSTOMER.MOVE_TO_ORDER,
    //       [result.insertId, req.user.email, restaurantId],
    //       (err2, result2) => {
    //         if (err2) {
    //           response.error(res, 500, err2.code);
    //           return;
    //         }
    //         db.query(
    //           CUSTOMER.CLEAR_CART,
    //           [req.user.email, restaurantId],
    //           (err3, result3) => {
    //             if (err3) {
    //               response.error(res, 500, err3.code);
    //               return;
    //             }
    //             res.send(result3);
    //           }
    //         );
    //       }
    //     );
    //   }
    // );
  }
};

const myOrders = (req, res) => {
  console.log(req.user);
  const { filter, deliveryType, rowsPerPage, currentPage } = req.query;
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "myOrders",
      {
        email: req.user.email,
        filter,
        deliveryType,
        rowsPerPage: parseInt(rowsPerPage, 10),
        currentPage: parseInt(currentPage, 10),
      },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(result);
        }
      }
    );

    // db.query(
    //   CUSTOMER.GET_ORDERS,
    //   [req.user.email, deliveryType, filter],
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

const getUserProfile = (req, res) => {
  if (!req.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    const email = req.user.isCustomer ? req.user.email : req.query.email;
    kafkaRequest(topics.request, "getUserProfile", { email }, (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
      } else {
        res.send(result);
      }
    });
    // db.query(CUSTOMER.GET_PROFILE1, [email, email, email], (err, result) => {
    //   if (err) {
    //     response.error(res, 500, err.code);
    //     return;
    //   }
    //   res.send(result);
    // });
  }
};

const updateUserInfo = (req, res) => {
  const {
    contact,
    email,
    dob,
    primaryAddress,
    name,
    nickname,
    picture,
    about,
  } = req.body;
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "updateUserInfo",
      {
        query: email,
        value: {
          status: 1,
          contact,
          email,
          dob,
          name,
          nickname,
          picture,
          about,
          primaryAddress,
        },
      },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send();
          // res.status(500);
        }
      }
    );

    // db.query(
    //   CUSTOMER.UPDATE_USER,
    //   [name, email, 1, req.user.email],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     db.query(
    //       CUSTOMER.UPDATE_USER_DATA,
    //       [
    //         email,
    //         picture,
    //         contact,
    //         dob,
    //         nickname,
    //         about,
    //         picture,
    //         contact,
    //         dob,
    //         nickname,
    //         about,
    //       ],
    //       (err1, result1) => {
    //         if (err1) {
    //           response.error(res, 500, err1.code);
    //           return;
    //         }
    //         db.query(
    //           CUSTOMER.UPDATE_USER_ADDRESS,
    //           [
    //             email,
    //             location,
    //             country,
    //             latitude,
    //             longitude,
    //             location,
    //             country,
    //             latitude,
    //             longitude,
    //           ],
    //           (err2, result2) => {
    //             if (err2) {
    //               response.error(res, 500, err2.code);
    //               return;
    //             }
    //             res.send();
    //           }
    //         );
    //       }
    //     );
    //   }
    // );
  }
};

const addToFavorites = (req, res) => {
  const { email } = req.body;
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "addToFavorites",
      { query: req.user.email, value: email },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send({ email });
        }
      }
    );
    // db.query(CUSTOMER.FAVORITE_ADD, [req.user.email, email], (err, result) => {
    //   if (err) {
    //     response.error(res, 500, err.code);
    //     return;
    //   }
    //   res.send({ email });
    // });
  }
};

const removeFromFavorites = (req, res) => {
  const { email } = req.body;
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "removeFromFavorites",
      { query: req.user.email, value: email },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send({ email });
        }
      }
    );
    // db.query(
    //   CUSTOMER.FAVORITE_REMOVE,
    //   [req.user.email, email],
    //   (err, result) => {
    //     if (err) {
    //       response.error(res, 500, err.code);
    //       return;
    //     }
    //     res.send({ email });
    //   }
    // );
  }
};

const getFavorites = (req, res) => {
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "getFavorites",
      { email: req.user.email },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(result.favorites);
        }
      }
    );
    // db.query(CUSTOMER.FAVORITE_GET, [req.user.email], (err, result) => {
    //   if (err) {
    //     response.error(res, 500, err.code);
    //     return;
    //   }
    //   res.send(result);
    // });
  }
};

const getAllAddresses = (req, res) => {
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "getAllAddresses",
      { email: req.user.email },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(result);
        }
      }
    );
    // db.query(CUSTOMER.ADDRESSES_GET_ALL, [req.user.email], (err, result) => {
    //   if (err) {
    //     response.error(res, 500, err.code);
    //     return;
    //   }
    //   res.send(result);
    // });
  }
};

const addNewAddress = (req, res) => {
  const { location, country, latitude, longitude } = req.body;
  if (!req.user || !req.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "addNewAddress",
      {
        email: req.user.email,
        value: { location, country, latitude, longitude },
      },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(result);
        }
      }
    );
    // db.query(
    //   CUSTOMER.ADDRESSES_ADD_NEW,
    //   [req.user.email, location, country, latitude, longitude],
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

const getRestaurantDelivery = (req, res) => {
  if (!req.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "getRestaurantDelivery",
      { email: req.query.email },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(result);
        }
      }
    );
    // db.query(
    //   RESTAURANT.GET_RESTAURANT_DELIVERY,
    //   [req.query.email],
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

const cancelMyOrder = (req, res) => {
  if (!req.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "cancelMyOrder",
      { orderId: req.body.orderId },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send(req.body.orderId);
        }
      }
    );
  }
};

const getOrderCount = (req, res) => {
  const { filter, deliveryType } = req.query;
  if (!req.user) {
    response.unauthorized(res, "unauthorized access");
  } else {
    kafkaRequest(
      topics.request,
      "getOrderCount",
      { email: req.user.email, filter, deliveryType },
      (err, result) => {
        if (err) {
          response.error(res, 500, err.code);
        } else {
          res.send({ count: result });
        }
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
  cancelMyOrder,
  getOrderCount,
};
