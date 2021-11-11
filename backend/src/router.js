const express = require("express");
const { signup, signin, signout } = require("./controller/account");
const {
  getRestaurantInfo,
  getDishes,
  createDish,
  updateDish,
  updateRestaurantInfo,
  getRestaurantOrders,
  updateOrderStatus,
  deleteDish,
} = require("./controller/restaurant");

const {
  getRestaurantsList,
  addToCart,
  getCart,
  getOrderDetails,
  addNewToCart,
} = require("./controller/common");

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
} = require("./controller/customer");
const { checkAuth } = require("./utils/auth");
const { makeRequest } = require("./kafka/client");

const router = express.Router();

// Account
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/signout").get(checkAuth, signout);

// Restaurant
router.route("/getRestaurantInfo").get(checkAuth, getRestaurantInfo);
router.route("/getDishes").get(checkAuth, getDishes);
router.route("/createDish").post(checkAuth, createDish);
router.route("/updateDish").post(checkAuth, updateDish);
router.route("/updateRestaurantInfo").post(checkAuth, updateRestaurantInfo);
router.route("/getRestaurantOrders").get(checkAuth, getRestaurantOrders);
router.route("/updateOrderStatus").post(checkAuth, updateOrderStatus);
router.route("/deleteDish").post(checkAuth, deleteDish);

// common
router.route("/getRestaurantsList").get(checkAuth, getRestaurantsList);
router.route("/addToCart").post(checkAuth, addToCart);
router.route("/addNewToCart").post(checkAuth, addNewToCart);
router.route("/getCart").get(checkAuth, getCart);
router.route("/getOrderDetails").get(checkAuth, getOrderDetails);

// customer
router.route("/placeOrder").post(checkAuth, placeOrder);
router.route("/myOrders").get(checkAuth, myOrders);
router.route("/getUserProfile").get(checkAuth, getUserProfile);
router.route("/updateUserInfo").post(checkAuth, updateUserInfo);
router.route("/addToFavorites").post(checkAuth, addToFavorites);
router.route("/removeFromFavorites").post(checkAuth, removeFromFavorites);
router.route("/getFavorites").get(checkAuth, getFavorites);
router.route("/getAllAddresses").get(checkAuth, getAllAddresses);
router.route("/addNewAddress").post(checkAuth, addNewAddress);
router.route("/getRestaurantDelivery").get(checkAuth, getRestaurantDelivery);

router.route("/kafka").get((req, res) => {
  makeRequest("request-topic", { test: "test" }, (error, response) => {
    console.log("callback response");
    res.send(response);
  });
});

module.exports = router;
