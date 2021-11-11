const {
  getPassword,
  registerUser,
  registerRestaurant,
} = require("./services/account");

const {
  getRestaurantInfo,
  updateRestaurantInfo,
  createDish,
  getDishes,
  updateDish,
} = require("./services/restaurant");

const {
  getRestaurantsList,
  addToCart,
  addNewToCart,
  getCart,
} = require("./services/common");

const {
  addToFavorites,
  getRestaurantDelivery,
  getAllAddresses,
  getUserProfile,
  updateUserInfo,
  placeOrder,
  myOrders,
  getFavorites,
  removeFromFavorites,
  addNewAddress,
} = require("./services/customer");

const functionMap = {
  getPassword,
  registerUser,
  registerRestaurant,
  getRestaurantInfo,
  updateRestaurantInfo,
  createDish,
  getDishes,
  updateDish,
  getRestaurantsList,
  addToFavorites,
  addToCart,
  addNewToCart,
  getCart,
  getRestaurantDelivery,
  getAllAddresses,
  getUserProfile,
  updateUserInfo,
  placeOrder,
  myOrders,
  getFavorites,
  removeFromFavorites,
  addNewAddress,
};

const callFunction = (msg, callback) => {
  const fn = functionMap[msg.functionName];
  fn(msg, callback);
};

module.exports = { callFunction };
