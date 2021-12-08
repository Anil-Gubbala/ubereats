const { AuthenticationError, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { signin } = require("../../src/controller/account");

module.exports = {
  Query: {
    signin: async (parent, args, context) => {
      // console.log(args);
      // console.log(context.req.req);
      // console.log(context);
      // const res = {
      //   send: () => ({ token: "hello" }),
      // };

      // try {
      const result = await new Promise((_res, _rej) => {
        signin({ body: args }, context, _res, _rej);
      }).catch((err) => {
        console.log(err);
        throw new Error(err);
      });
      return result;

      // } catch {
      //   throw new Error("err");
      // }

      // result.then(())
      // const token = await signin({ body: args });
      // return token;

      // throw new Error("err");

      // return {
      //   id: 1,
      //   name: "",
      //   password: jwt.sign({ email: "email", name: "name" }, "lab3"),
      // };
    },
  },
  Mutation: {},
};
