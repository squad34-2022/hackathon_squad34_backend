const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: "String",
    require: true,
  },
  type: {
    type: "String",
    require: true,
  },
  author: {
    type: "String",
    require: true,
  },
  link: {
    type: "String",
    require: true,
  },
  trail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trail",
  },
});

const Course = mongoose.model("Course", Schema);

module.exports = Course;
