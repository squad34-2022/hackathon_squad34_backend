const mongoose = require("mongoose");

const TrailSchema = new mongoose.Schema({
  name: String,
});

const TrailModel = mongoose.model("Trail", TrailSchema);

module.exports = TrailModel;
