const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: "String",
    require: true,
  },
  description: {
    type: "String",
    require: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Trail = mongoose.model("Trail", Schema);

module.exports = Trail;
