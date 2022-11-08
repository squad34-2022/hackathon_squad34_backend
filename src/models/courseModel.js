const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: String,
  type: String,
  author: String,
  link: String,
});

const CourseModel = mongoose.model("Course", CourseSchema);

module.exports = CourseModel;
