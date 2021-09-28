const express = require('express');
const { registerRestaurant, signin, signout } = require('./controller/account');
const {
  getRestaurantInfo,
  getDishes,
  addDish,
  updateDish,
} = require('./controller/restaurant');

const router = express.Router();

// Account
router.route('/registerRestaurant').post(registerRestaurant);
router.route('/signin').post(signin);
router.route('/signout').get(signout);

// Restaurant
router.route('/restaurantInfo').get(getRestaurantInfo);
router.route('/getDishes').get(getDishes);
router.route('/addDish').post(addDish);
router.route('/updateDish').post(updateDish);

module.exports = router;
