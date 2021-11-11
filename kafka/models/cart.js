const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  restaurantId: { type: String, required: true },
  dishes: [
    {
      dish: { type: String, required: true, unique: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
