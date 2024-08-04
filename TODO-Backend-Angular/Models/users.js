const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,

    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  todos: [todoSchema],
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
