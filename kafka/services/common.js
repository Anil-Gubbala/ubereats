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
  if (value.count <= 0) {
    OrderModel.findOneAndUpdate(
      {
        userId: query.userId,
        isCart: 1,
      },
      { $pull: { dishes: { dish: value.dish } } },
      // { $pull: { dishes: { $elemMatch: { dish: value.dish } } } },
      // { dishes: { $pull: { "dishes.dish": value.dish } } },
      { new: true }
    ).exec((err, result) => {
      if (err) {
        console.log(`error:${err}`);
        callback(err, result);
      } else {
        console.log(result);
        if (result.dishes.length === 0) {
          doExec(
            OrderModel.findOneAndDelete({ userId: query.userId, isCart: 1 }),
            (err, result) => {
              if (err) {
                callback(err, result);
              } else {
                callback(null, result);
              }
            }
          );
        } else {
          callback(null, result);
        }
      }
    });
    return;
  }
  const find = OrderModel.findOne({
    userId: query.userId,
    isCart: 1,
  });
  find.exec((err, result) => {
    if (err) {
      console.log(`error:${err}`);
      callback(err, result);
    } else if (!result) {
      // record not exist
      const cart = new OrderModel({ ...query, dishes: [{ ...value }] });
      cart.save((err1, result1) => {
        if (err1) {
          console.log(`error:${err1}`);
          callback(err1, result1);
        } else {
          callback(null, result1);
        }
      });
    } else if (result.restaurantId !== query.restaurantId) {
      // other restaurant record exist
      doExec(
        OrderModel.findOneAndUpdate(
          {
            userId: query.userId,
            isCart: 1,
          },
          {
            restaurantId: query.restaurantId,
            $push: { dishes: { ...value } },
          }
        ),
        callback
      );
    } else {
      console.log("a");
      const itemIndex = result.dishes.findIndex((p) => p.dish === value.dish);
      if (itemIndex > -1) {
        // dish already exists
        doExec(
          OrderModel.findOneAndUpdate(
            {
              userId: query.userId,
              isCart: 1,
            },
            { $set: { "dishes.$[el].count": value.count } },
            {
              arrayFilters: [{ "el.dish": value.dish }],
            } // or use increment and use result in frontend
          ),
          callback
        );
      } else {
        // dish not exist
        doExec(
          OrderModel.findOneAndUpdate(
            {
              userId: query.userId,
              isCart: 1,
            },
            { $push: { dishes: { ...value } } }
          ),
          callback
        );
      }
      // same restaurant records exist.
    }
  });
};

// const addToCart = (msg, callback) => {
//   const { query, value } = msg.data;
//   const find = OrderModel.findOneAndUpdate(
//     {
//       userId: query.userId,
//       isCart:1,
//       restaurantId: query.restaurantId,
//       "dishes.dish": { $ne: query.dish },
//     },
//     { $push: { dishes: { ...value, dish: query.dish } } },
//     { upsert: false }
//   );
//   find.exec((err, result) => {
//     if (err) {
//       console.log(`error:${err}`);
//       callback(err, result);
//     } else if (!result) {
//       doExec(
//         OrderModel.findOneAndUpdate(
//           {
//             userId: query.userId,
//             restaurantId: query.restaurantId,
//             "dishes.dish": query.dish,
//           },
//           { $set: { "dishes.$.count": value.count } } // or use increment and use result in frontend
//         ),
//         callback
//       );
//     } else {
//       callback(null, result);
//     }
//   });
// };

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

const getOrderDetails = (msg, callback) => {
  doExec(OrderModel.findById({ _id: msg.data.id }), callback);
};

module.exports = {
  getRestaurantsList,
  addToCart,
  addNewToCart,
  getCart,
  getOrderDetails,
};
