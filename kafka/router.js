const {
  getPassword,
  registerUser,
  registerRestaurant,
} = require("./services/account");

const functionMap = {
  getPassword,
  registerUser,
  registerRestaurant,
};

const callFunction = (msg, callback) => {
  const fn = functionMap[msg.functionName];
  fn(msg, callback);
};

module.exports = { callFunction };
