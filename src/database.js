const { MONGO_URI } = require("./constants")
const mongoose = require("mongoose")

const connect = async () => {
  await mongoose.connect(MONGO_URI)
  console.log("Connected to database!")
}

connect()
