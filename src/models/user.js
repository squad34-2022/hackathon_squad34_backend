const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: "String",
    require: true,
  },
  email: {
    type: "String",
    require: true,
  },
  password: {
    type: "String",
    require: true,
  },
});

const User = mongoose.model("Users", Schema);

module.exports = User;
