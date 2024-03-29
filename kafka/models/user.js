const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
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
  picture: { type: String },
  contact: { type: Number },
  dob: { type: Date },
  nickname: { type: String },
  about: { type: String },
  favorites: {
    type: Array,
    items: { type: String, uniqueItems: true },
  },
  primaryAddress: {
    country: { type: String },
    location: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  addresses: [
    {
      country: { type: String },
      location: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      // active: { type: Number, default: 0 },
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
