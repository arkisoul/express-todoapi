const mongoose = require("mongoose");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => emailRegex.test(value),
      message: "Enter a valid email",
    },
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
