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
  getRestaurantOrders,
  updateOrderStatus,
  deleteDish,
} = require("./services/restaurant");

const {
  getRestaurantsList,
  addToCart,
  addNewToCart,
  getCart,
  getOrderDetails,
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
  cancelMyOrder,
  getOrderCount,
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
  getOrderDetails,
  getRestaurantOrders,
  updateOrderStatus,
  deleteDish,
  cancelMyOrder,
  getOrderCount,
};

const callFunction = (msg, callback) => {
  const fn = functionMap[msg.functionName];
  fn(msg, callback);
};

module.exports = { callFunction };
