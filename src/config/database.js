require("dotenv").config();
const { MONGO_URI } = process.env;

const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to database!");
};

connect();
