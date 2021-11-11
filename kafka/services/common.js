const RestaurantModel = require("../models/restaurant");
const UserModel = require("../models/user");
const CartModel = require("../models/cart");
const { doExec } = require("../utils/doQuery");
const OrderModel = require("../models/order");

const getRestaurantsList = (msg, callback) => {
  const { search, delivery, vegType, favorite, email } = msg.data;
  let query;

  if (search === "" && delivery === -1 && vegType === -1 && favorite === 0) {
    query = {};
  } else {
    query = { $and: [] };
  }

  if (search !== "") {
    const $or = [];
    $or.push({ "dishes.name": { $regex: search, $options: "i" } });
    $or.push({ location: { $regex: search, $options: "i" } });
    // query[] = ;
    // query.location = { $regex: search, $options: "i" };
    query.$and.push({ $or });
  }
  if (delivery !== -1) {
    // query.delivery = delivery;
    query.$and.push({ delivery });
  }
  if (vegType !== -1) {
    // query["dishes.vegType"] = vegType;
    query.$and.push({ vegType });
  }

  const select = ["-dishes", "-password", "-__v"];
  if (favorite !== 0) {
    const userModel = UserModel.findOne({ email }).select("favorites");
    userModel.exec((err, result) => {
      if (err) {
        console.log("err: ", err);
        callback(err, result);
      } else {
        query.$and.push({ email: { $in: result.favorites } });
        doExec(RestaurantModel.find(query).select(select), callback);
      }
    });
  } else {
    doExec(RestaurantModel.find(query).select(select), callback);
  }
};

const addToCart = (msg, callback) => {
  const { query, value } = msg.data;
  const find = OrderModel.findOneAndUpdate(
    {
      userId: query.userId,
      restaurantId: query.restaurantId,
      "dishes.dish": { $ne: query.dish },
    },
    { $push: { dishes: { ...value, dish: query.dish } } },
    { upsert: true }
  );
  find.exec((err, result) => {
    if (err) {
      console.log(`error:${err}`);
      callback(err, result);
    } else if (!result) {
      doExec(
        OrderModel.findOneAndUpdate(
          {
            userId: query.userId,
            restaurantId: query.restaurantId,
            "dishes.dish": query.dish,
          },
          { $set: { "dishes.$.count": value.count } } // or use increment and use result in frontend
        ),
        callback
      );
    } else {
      callback(null, result);
    }
  });
};

const addNewToCart = (msg, callback) => {
  const { query, value } = msg.data;
  const first = OrderModel.findOneAndDelete({
    userId: query.userId,
  });
  first.exec((err, result) => {
    if (err) {
      console.log(`error:${err}`);
      callback(err, result);
    } else {
      const cart = new OrderModel({ ...query, dishes: [{ ...value }] });
      cart.save((err1, result1) => {
        if (err1) {
          console.log(`error:${err1}`);
          callback(err1, result1);
        } else {
          callback(null, result1);
        }
      });
    }
  });
};

const getCart = (msg, callback) => {
  doExec(OrderModel.findOne({ ...msg.data, isCart: 1 }), callback);
};

module.exports = { getRestaurantsList, addToCart, addNewToCart, getCart };
