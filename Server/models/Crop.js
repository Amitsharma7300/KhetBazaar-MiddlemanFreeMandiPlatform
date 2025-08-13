const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming your buyer is stored in User collection
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const cropSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  cropType: String,
  variety: String,
  grade: String,
  quantity: Number,
  unit: String,
  price: Number,
  harvestDate: Date,
  location: String,
  irrigationType: String,
  soilType: String,
  organic: Boolean,
  description: String,
  image: String,

  // FIX: Add bids array
  bids: [bidSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Crop", cropSchema);
