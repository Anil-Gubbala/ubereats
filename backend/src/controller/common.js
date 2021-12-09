const db = require("../dbConnector");
const COMMON = require("../sql/commonSql");
const { response } = require("../utils/response");

const getRestaruantsList = (req, _res, _rej) => {
  const { search } = req.query;

  const delivery = parseInt(req.query.delivery, 10);
  const vegType = parseInt(req.query.vegType, 10);
  const favorite = parseInt(req.query.favorite, 10);

  let base = ` select distinct restaurant_login.email from ubereats.restaurant_login join ubereats.dishes on restaurant_login.email = dishes.email`;
  const fav = `  restaurant_login.email IN (select restaurant_id from favorite where user_id = '${req.session.user.email}') `;
  const match = ` (location like '%${search}%' or dishes.name like '%${search}%') `;

  if (vegType !== -1 || delivery !== -1 || favorite !== 0 || search !== "") {
    base += " where ";
  }
  if (vegType !== -1) {
    base += ` dishes.type = ${vegType} `;
    if (delivery !== -1) {
      base += ` and restaurant_login.delivery = ${delivery} `;
    }
  } else if (delivery !== -1) {
    base += ` restaurant_login.delivery = ${delivery} `;
  }

  if (favorite === 1) {
    if (delivery !== -1 || vegType !== -1) {
      base += ` and ${fav}`;
    } else {
      base += fav;
    }
  }
  if (search !== "") {
    if (delivery !== -1 || vegType !== -1 || favorite !== 0) {
      base += ` and ${match}`;
    } else {
      base += match;
    }
  }

  const final = `select * from ubereats.restaurant_login where email IN (${base})`;
  if (!req.session.user || !req.session.user.isCustomer) {
    // response.unauthorized(res, "unauthorized access");
    _rej("unauthorized");
  } else {
    db.query(final, (err, result) => {
      if (err) {
        // response.error(res, 500, err.code);
        _rej(err.code);
        return;
      }
      // db.query(
      //   'select * from ubereats.restaurant_login where email IN ()',
      //   (err1, result1) => {
      //     if (err1) {
      //       response.error(res, 500, err1.code);
      //       return;
      //     }
      //     res.send(result1);
      //   }
      // );
      // res.send(result);
      _res(result);
    });
  }
};

const addToCart = (req, _res, _rej) => {
  const { restaurantId, dish, count, price } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    _rej("unauthorized");
    // response.unauthorized(res, "unauthorized access");
  } else {
    db.query(
      COMMON.ADD_TO_CART,
      [req.session.user.email, restaurantId, dish, count, price, count],
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

const addNewToCart = (req, res) => {
  const { restaurantId, dish, count, price } = req.body;
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, "unauthorized access");
  } else {
    db.query(COMMON.CLEAR_CART, [], (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      db.query(
        COMMON.ADD_TO_CART,
        [req.session.user.email, restaurantId, dish, count, price, count],
        (err1, result1) => {
          if (err1) {
            response.error(res, 500, err1.code);
            return;
          }
          res.send();
        }
      );
    });
  }
};

const getCart = (req, _res, _rej) => {
  if (!req.session.user || !req.session.user.isCustomer) {
    _rej("unauthorized");
    // response.unauthorized(res, "unauthorized access");
  } else {
    db.query(COMMON.GET_CART, [req.session.user.email], (err, result) => {
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

const getOrderDetails = (req, _res, _rej) => {
  if (!req.session.user) {
    _rej("unauthorized");
    // response.unauthorized(res, "unauthorized access");
  } else {
    db.query(COMMON.GET_ORDER_DETAILS, [req.query.id], (err, result) => {
      if (err) {
        _res(err.code);
        // response.error(res, 500, err.code);
        return;
      }
      _res(result);
      // res.send(result);
    });
  }
};

module.exports = {
  getRestaruantsList,
  addToCart,
  getCart,
  getOrderDetails,
  addNewToCart,
};
