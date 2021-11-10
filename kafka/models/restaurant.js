const mongoose = require("mongoose");

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  status: { type: Number, required: true },
  password: {
    type: String,
    required: true,
  },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  picture: { type: String, required: true },
  contact: { type: Number, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  delivery: { type: Number, required: true },
});

const RestaurantModel = mongoose.model("restaurant", RestaurantSchema);

module.exports = RestaurantModel;
