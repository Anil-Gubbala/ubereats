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
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
