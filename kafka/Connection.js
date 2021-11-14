const kafka = require("kafka-node");
const config = require("./utils/config");

function ConnectionProvider() {
  this.getConsumer = function (topicName) {
    this.client = new kafka.KafkaClient({
      kafkaHost: `${config.KAFKA_HOST}:${config.KAFKA_PORT}`,
    });
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topicName, partition: 0 },
    ]);
    this.client.on("ready", () => {
      console.log("Request consumer ready!");
    });

    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({
        kafkaHost: `${config.KAFKA_HOST}:${config.KAFKA_PORT}`,
      });
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log("Response producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
module.exports = new ConnectionProvider();
