const express = require('express');
const { signup, signin, signout } = require('./controller/account');
const {
  getRestaurantInfo,
  getDishes,
  addDish,
  updateDish,
  updateRestaurantInfo,
} = require('./controller/restaurant');

const {
  getRestaruantsList,
  addToCart,
  getCart,
  getOrderDetails,
} = require('./controller/common');

const { placeOrder, myOrders } = require('./controller/customer');

const router = express.Router();

// Account
router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').get(signout);

// Restaurant
router.route('/restaurantInfo').get(getRestaurantInfo);
router.route('/getDishes').get(getDishes);
router.route('/addDish').post(addDish);
router.route('/updateDish').post(updateDish);
router.route('/updateRestaurantInfo').post(updateRestaurantInfo);

// common
router.route('/getRestaruantsList').get(getRestaruantsList);
router.route('/addToCart').post(addToCart);
router.route('/getCart').get(getCart);
router.route('/getOrderDetails').get(getOrderDetails);

// customer
router.route('/placeOrder').post(placeOrder);
router.route('/myOrders').get(myOrders);

module.exports = router;
