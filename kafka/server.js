// topics files
// var signin = require('./services/signin.js');
const mongoose = require("mongoose");
const connection = require("./Connection");
const { callFunction } = require("./router");
const { config } = require("./utils/config");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.mongoDB, options, (err) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
const producer = connection.getProducer();

function handleTopicRequest(topicName, fname) {
  // var topicName = 'root_topic';
  const consumer = connection.getConsumer(topicName);
  // console.log("server is running ");
  consumer.on("message", (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    if (!IsJsonString(message.value)) {
      return;
    }
    const data = JSON.parse(message.value);

    fname(data.data, (err, res) => {
      // console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
            error: err,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, data) => {
        // console.log(data);
      });
    });
  });
}

handleTopicRequest("request-topic", callFunction);
