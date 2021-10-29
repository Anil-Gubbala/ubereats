const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
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
  picture: { type: String, required: true },
  contact: { type: Number, required: true },
  dob: { type: Date, required: true },
  nickname: { type: String, required: true },
  about: { type: String, required: true },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
