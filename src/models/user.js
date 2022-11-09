const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

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

Schema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

Schema.pre("update", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
const User = mongoose.model("Users", Schema);

module.exports = User;
