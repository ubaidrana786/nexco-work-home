const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { string } = require("joi");

const studentScheme = new mongoose.Schema({
  fname: String,
  dob: String,
  status: String,
  city: String,
  gender: String,
  date: String,
  email: String,
  number: String,
  branch: String,
  officer: String,
  image:String,
  type:String,
  buy:String,
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("students", studentScheme);
