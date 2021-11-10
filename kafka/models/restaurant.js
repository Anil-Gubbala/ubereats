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
  start: { type: Date },
  end: { type: Date },
  delivery: { type: Number },
});

const RestaurantModel = mongoose.model("restaurant", RestaurantSchema);

module.exports = RestaurantModel;
