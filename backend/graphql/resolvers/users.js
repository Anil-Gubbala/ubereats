const { AuthenticationError, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { signin, signup } = require("../../src/controller/account");
const { getRestaruantsList } = require("../../src/controller/common");
const {
  getUserProfile,
  updateUserInfo,
} = require("../../src/controller/customer");

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
  },
};
