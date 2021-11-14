const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  address: { type: String },
  status: {
    type: String,
    required: true,
    default: 0,
  },
  date: { type: Date, required: true, default: Date.now },
  delivery: { type: String, required: true, default: 0 },
  dishes: [
    {
      dish: { type: String, required: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  isCart: { type: Number, required: true, default: 1 },
  instructions: { type: String },
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;
