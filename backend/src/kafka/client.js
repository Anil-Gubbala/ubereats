const Kafkarpc = require("./kafkarpc");

const rpc = new Kafkarpc();

// make request to kafka
function makeRequest(queueName, msgPayload, callback) {
  // console.log("in make request");
  // console.log(msgPayload);
  rpc.makeRequest(queueName, msgPayload, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      // console.log("response", response);
      callback(null, response);
    }
  });
}

module.exports = { makeRequest };
