const connection = require("../Connection");

const handleRequest = (msg, callback) => {
  const res = {};
  console.log(`In handle request:${JSON.stringify(msg)}`);
  callback(null, { result: "response" });
};

module.exports = handleRequest;
