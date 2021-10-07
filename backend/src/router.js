const express = require('express');
const { signup, signin, signout } = require('./controller/account');
const {
  getRestaurantInfo,
  getDishes,
  addDish,
  updateDish,
  updateRestaurantInfo,
  getRestaurantOrders,
  updateOrderStatus,
} = require('./controller/restaurant');

const {
  getRestaruantsList,
  addToCart,
  getCart,
  getOrderDetails,
} = require('./controller/common');

const {
  placeOrder,
  myOrders,
  getUserProfile,
  updateUserInfo,
} = require('./controller/customer');

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
router.route('/getRestaurantOrders').get(getRestaurantOrders);
router.route('/updateOrderStatus').post(updateOrderStatus);

// common
router.route('/getRestaruantsList').get(getRestaruantsList);
router.route('/addToCart').post(addToCart);
router.route('/getCart').get(getCart);
router.route('/getOrderDetails').get(getOrderDetails);

// customer
router.route('/placeOrder').post(placeOrder);
router.route('/myOrders').get(myOrders);
router.route('/getUserProfile').get(getUserProfile);
router.route('/updateUserInfo').post(updateUserInfo);

module.exports = router;
