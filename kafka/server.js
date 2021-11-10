// topics files
// var signin = require('./services/signin.js');
const Books = require("./services/books");
const connection = require("./Connection");

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
  console.log("server is running ");
  consumer.on("message", (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    if (!IsJsonString(message.value)) {
      return;
    }
    const data = JSON.parse(message.value);

    fname(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  });
}

handleTopicRequest("request-topic", Books);
