const { AuthenticationError, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { signin, signup } = require("../../src/controller/account");
const {
  getRestaruantsList,
  getOrderDetails,
  addToCart,
  getCart,
} = require("../../src/controller/common");
const {
  getUserProfile,
  updateUserInfo,
  getRestaurantDelivery,
  getAllAddresses,
  placeOrder,
  myOrders,
} = require("../../src/controller/customer");
const {
  getRestaurantInfo,
  getDishes,
  updateRestaurantInfo,
  createDish,
  getRestaurantOrders,
  updateOrderStatus,
} = require("../../src/controller/restaurant");

const makeRequest = (args, context, func, type) =>
  new Promise((_res, _rej) => {
    func({ [type]: args, session: context }, _res, _rej);
  });

module.exports = {
  Query: {
    signin: async (parent, args, context) => {
      const result = await makeRequest(args, context, signin, "body").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
    getUserProfile: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        getUserProfile,
        "query"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    getRestaruantsList: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        getRestaruantsList,
        "query"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    getRestaurantInfo: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        getRestaurantInfo,
        "query"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    getDishes: async (parent, args, context) => {
      const result = await makeRequest(args, context, getDishes, "query").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
    getRestaurantOrders: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        getRestaurantOrders,
        "query"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    getOrderDetails: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        getOrderDetails,
        "query"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    getCart: async (parent, args, context) => {
      const result = await makeRequest(args, context, getCart, "query").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
    getRestaurantDelivery: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        getRestaurantDelivery,
        "query"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    getAllAddresses: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        getAllAddresses,
        "query"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    myOrders: async (parent, args, context) => {
      const result = await makeRequest(args, context, myOrders, "query").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
  },

  Mutation: {
    signup: async (parent, args, context) => {
      const result = await makeRequest(args, context, signup, "body").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
    updateUserInfo: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        updateUserInfo,
        "body"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    updateRestaurantInfo: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        updateRestaurantInfo,
        "body"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    updateOrderStatus: async (parent, args, context) => {
      const result = await makeRequest(
        args,
        context,
        updateOrderStatus,
        "body"
      ).catch((err) => {
        throw new Error(err);
      });
      return result;
    },
    createDish: async (parent, args, context) => {
      const result = await makeRequest(args, context, createDish, "body").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
    addToCart: async (parent, args, context) => {
      const result = await makeRequest(args, context, addToCart, "body").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
    placeOrder: async (parent, args, context) => {
      const result = await makeRequest(args, context, placeOrder, "body").catch(
        (err) => {
          throw new Error(err);
        }
      );
      return result;
    },
  },
};
