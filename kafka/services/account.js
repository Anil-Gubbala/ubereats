const RestaurantModel = require("../models/restaurant");
const UserModel = require("../models/user");
const { doInsert, doExec } = require("../utils/doQuery");

const getPassword = (msg, callback) => {
  const { isCustomer, email } = msg.data;
  if (isCustomer) {
    doExec(UserModel.findOne({ email }, ["password"]), callback);
  } else {
    doExec(RestaurantModel.findOne({ email }, ["password"]), callback);
  }
};

const registerUser = (msg, callback) => {
  const { name, email, password } = msg.data;
  const userModel = new UserModel({ name, email, password });
  doInsert(userModel, callback);
};

const registerRestaurant = (msg, callback) => {
  const { name, email, password, location, latitude, longitude } = msg.data;
  const userModel = new RestaurantModel({
    name,
    email,
    password,
    location,
    latitude,
    longitude,
  });
  doInsert(userModel, callback);
};

module.exports = { getPassword, registerUser, registerRestaurant };
