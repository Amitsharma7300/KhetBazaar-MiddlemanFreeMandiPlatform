const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  amount: Number,
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
});

module.exports = mongoose.model("Bid", bidSchema);
