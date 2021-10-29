const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema({
  user_id: { type: String, required: true },
  address_id: { type: String, required: true },
  delivery: { type: Number, required: true },
  dishes: [
    {
      dish: { type: String, required: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model("user", CartSchema);

module.exports = CartModel;
