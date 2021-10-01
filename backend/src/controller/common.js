const db = require('../dbConnector');
const COMMON = require('../sql/commonSql');
const { response } = require('../utils/response');

const getRestaruantsList = (req, res) => {
  if (!req.session.user || !req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(COMMON.GET_RESTAURANTS, (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      res.send(result);
    });
  }
};

const addToCart = (req, res) => {
  const { body } = req;
  if (!req.session.user || req.session.user.isCustomer) {
    response.unauthorized(res, 'unauthorized access');
  } else {
    db.query(COMMON.ADD_TO_CART, [req.session.user.email], (err, result) => {
      if (err) {
        response.error(res, 500, err.code);
        return;
      }
      res.send();
    });
  }
};

module.exports = {
  getRestaruantsList,
  addToCart,
};
