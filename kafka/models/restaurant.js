const mongoose = require("mongoose");

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  status: { type: Number, required: true, default: 0 },
  password: {
    type: String,
    required: true,
  },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  picture: { type: String },
  contact: { type: Number },
  description: { type: String },
  start: { type: String },
  end: { type: String },
  delivery: { type: Number },
  dishes: {
    type: Array,
    items: {
      name: { type: String, unique: true },
      ingredients: { type: String },
      picture: { type: String },
      price: { type: String },
      description: { type: String },
      category: { type: String, default: 0 },
      type: { type: String, default: 0 },
    },
  },
});

const RestaurantModel = mongoose.model("restaurant", RestaurantSchema);

module.exports = RestaurantModel;
