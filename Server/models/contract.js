const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
  bid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
  cropType: String,
  volume: Number,
  price: Number,
  duration: String,
  status: { type: String, default: "active" }
});

module.exports = mongoose.model("Contract", contractSchema);