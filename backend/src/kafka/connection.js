const kafka = require("kafka-node");
const config = require("./config");

function ConnectionProvider() {
  this.getConsumer = function (topicName) {
    // if (!this.kafkaConsumerConnection) {
    this.client = new kafka.KafkaClient({
      kafkaHost: `${config.KAFKA_HOST}:${config.KAFKA_PORT}`,
    });
    // this.client = new kafka.Client("localhost:2181");
    /* this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            }); */
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topicName, partition: 0 },
    ]);
    this.client.on("ready", () => {
      console.log("client ready!");
    });
    // }
    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({
        kafkaHost: `${config.KAFKA_HOST}:${config.KAFKA_PORT}`,
      });
      /* this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            }); */
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      // this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
module.exports = new ConnectionProvider();
