const OrderModel = require("../models/order");
const RestaurantModel = require("../models/restaurant");
const UserModel = require("../models/user");
const { doExec } = require("../utils/doQuery");

const addToFavorites = (msg, callback) => {
  const { query, value } = msg.data;
  doExec(
    UserModel.findOneAndUpdate(
      { email: query },
      { $push: { favorites: value } }
    ),
    callback
  );
};

const getRestaurantDelivery = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(RestaurantModel.findOne({ ...msg.data }).select("delivery"), callback);
};

const getAllAddresses = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(
    UserModel.findOne({ ...msg.data }).select(["addresses", "primaryAddress"]),
    callback
  );
};

const getUserProfile = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(UserModel.findOne({ ...msg.data }).select(["-favorites"]), callback);
};

const updateUserInfo = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(
    UserModel.findOneAndUpdate(
      { email: msg.data.query },
      { ...msg.data.value }
    ),
    callback
  );
};

const placeOrder = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(
    OrderModel.findOneAndUpdate(
      { email: msg.data.email, isCart: 1 },
      {
        address: msg.data.address,
        delivery: msg.data.delivery,
        isCart: 0,
        date: Date.now(),
      }
    ),
    callback
  );
};

const myOrders = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(
    OrderModel.find({
      email: msg.data.email,
      status: msg.data.filter,
      delivery: msg.data.deliveryType,
      isCart: 0,
    }),
    callback
  );
};

const getFavorites = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(
    UserModel.findOne({
      email: msg.data.email,
    }).select("favorites"),
    callback
  );
};

const removeFromFavorites = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(
    UserModel.findOneAndUpdate(
      {
        email: msg.data.query,
      },
      { $pull: { favorites: msg.data.value } }
    ).select("favorites"),
    callback
  );
};

const addNewAddress = (msg, callback) => {
  // const { query, value } = msg.data;
  doExec(
    UserModel.findOneAndUpdate(
      {
        email: msg.data.email,
      },
      { $push: { addresses: msg.data.value } }
    ).select("addresses"),
    callback
  );
};

module.exports = {
  placeOrder,
  addToFavorites,
  getRestaurantDelivery,
  getAllAddresses,
  getUserProfile,
  updateUserInfo,
  myOrders,
  getFavorites,
  removeFromFavorites,
  addNewAddress,
};
