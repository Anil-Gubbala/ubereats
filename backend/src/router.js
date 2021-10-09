const express = require('express');
const { signup, signin, signout } = require('./controller/account');
const {
  getRestaurantInfo,
  getDishes,
  createDish,
  updateDish,
  updateRestaurantInfo,
  getRestaurantOrders,
  updateOrderStatus,
  deleteDish,
} = require('./controller/restaurant');

const {
  getRestaruantsList,
  addToCart,
  getCart,
  getOrderDetails,
  addNewToCart,
} = require('./controller/common');

const {
  placeOrder,
  myOrders,
  getUserProfile,
  updateUserInfo,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  getAllAddresses,
  addNewAddress,
  getRestaurantDelivery,
} = require('./controller/customer');

const router = express.Router();

// Account
router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').get(signout);

// Restaurant
router.route('/restaurantInfo').get(getRestaurantInfo);
router.route('/getDishes').get(getDishes);
router.route('/createDish').post(createDish);
router.route('/updateDish').post(updateDish);
router.route('/updateRestaurantInfo').post(updateRestaurantInfo);
router.route('/getRestaurantOrders').get(getRestaurantOrders);
router.route('/updateOrderStatus').post(updateOrderStatus);
router.route('/deleteDish').post(deleteDish);

// common
router.route('/getRestaruantsList').get(getRestaruantsList);
router.route('/addToCart').post(addToCart);
router.route('/addNewToCart').post(addNewToCart);
router.route('/getCart').get(getCart);
router.route('/getOrderDetails').get(getOrderDetails);

// customer
router.route('/placeOrder').post(placeOrder);
router.route('/myOrders').get(myOrders);
router.route('/getUserProfile').get(getUserProfile);
router.route('/updateUserInfo').post(updateUserInfo);
router.route('/addToFavorites').post(addToFavorites);
router.route('/removeFromFavorites').post(removeFromFavorites);
router.route('/getFavorites').get(getFavorites);
router.route('/getAllAddresses').get(getAllAddresses);
router.route('/addNewAddress').post(addNewAddress);
router.route('/getRestaurantDelivery').get(getRestaurantDelivery);

module.exports = router;
