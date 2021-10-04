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

module.exports = {
  placeOrder,
};
