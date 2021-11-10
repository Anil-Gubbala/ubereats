const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: { type: String, required: true },
  address_id: { type: String, required: true },
  status: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  restaurant_id: { type: Number, required: true },
  delivery: { type: Number, required: true },
  dishes: [
    {
      dish: { type: String, required: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const OrderModel = mongoose.model("user", OrderSchema);

module.exports = OrderModel;
