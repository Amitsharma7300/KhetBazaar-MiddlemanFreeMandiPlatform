// models/Logistics.js
const mongoose = require("mongoose");

const logisticsSchema = new mongoose.Schema({
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
  bid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  mobile: String,
  pickupLocation: String,
  deliveryLocation: String,
  expectedDate: Date,
  paymentMode: String,
  // Transport management fields:
  transportType: String,        // e.g. "Truck", "Mini Van"
  vehicleNumber: String,
  driverName: String,
  driverContact: String,
  status: { type: String, default: "booked" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Logistics", logisticsSchema);