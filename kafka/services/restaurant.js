const mongoose = require("mongoose");
const OrderModel = require("../models/order");
const RestaurantModel = require("../models/restaurant");

const { doExec } = require("../utils/doQuery");

const getRestaurantInfo = (msg, callback) => {
  const { email } = msg.data;

  doExec(RestaurantModel.findOne({ email }).select("-password"), callback);
};

const updateRestaurantInfo = (msg, callback) => {
  const { email } = msg.data;

  doExec(RestaurantModel.findOneAndUpdate({ email }, msg.data), callback);
};

const createDish = (msg, callback) => {
  const { email } = msg.data.query;
  doExec(
    RestaurantModel.findOneAndUpdate(
      { email },
      { $push: { dishes: msg.data.value } }
    ),
    callback
  );
};

const updateDish = (msg, callback) => {
  const { email, dish } = msg.data.query;
  const { name, ingredients, picture, price, description, category, type } =
    msg.data.value;
  doExec(
    RestaurantModel.findOneAndUpdate(
      { email, "dishes.name": dish },
      {
        $set: {
          "dishes.$.name": name,
          "dishes.$.ingredients": ingredients,
          "dishes.$.picture": picture,
          "dishes.$.price": price,
          "dishes.$.description": description,
          "dishes.$.category": category,
          "dishes.$.type": type,
        },
      }
    ),
    callback
  );
};

const getDishes = (msg, callback) => {
  const { email, type } = msg.data;
  if (type) {
    doExec(
      RestaurantModel.findOne({
        email,
        dishes: { $elemMatch: { type } },
      }).select("dishes"),
      callback
    );
  } else {
    doExec(
      RestaurantModel.findOne({
        email,
      }).select("dishes"),
      callback
    );
  }
};

const getRestaurantOrders = (msg, callback) => {
  const { email, filter } = msg.data;
  const query = {};
  query.email = email;
  query.isCart = 0;
  if (filter === 0) {
    query.status = { $lte: 2 };
  } else {
    query.status = filter;
  }

  doExec(OrderModel.find(query), callback);
};

const updateOrderStatus = (msg, callback) => {
  doExec(
    OrderModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(msg.data.id) },
      { status: msg.data.status }
    ),
    callback
  );
};

const deleteDish = (msg, callback) => {
  doExec(
    RestaurantModel.findOneAndUpdate(
      { email: msg.data.email },
      { $pull: { dishes: { name: msg.data.name } } }
    ),
    callback
  );
};

module.exports = {
  getRestaurantInfo,
  updateRestaurantInfo,
  createDish,
  getDishes,
  updateDish,
  getRestaurantOrders,
  updateOrderStatus,
  deleteDish,
};
