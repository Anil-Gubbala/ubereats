const express = require('express');
const { registerRestaurant, signin, signout } = require('./controller/account');

const router = express.Router();

router.route('/registerRestaurant').post(registerRestaurant);
router.route('/signin').post(signin);
router.route('/signout').get(signout);

module.exports = router;
