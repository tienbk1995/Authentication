const mongoose = require("mongoose");
const { Schema } = mongoose;

// Set up mongo user schema
const userSchema = new Schema({
  username: String,
  password: String,
});

// Create user model
const userModel = new mongoose.model("UserAccount", userSchema);

module.exports = userModel;
