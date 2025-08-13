const User = require("../models/User");
const Crop = require("../models/Crop");
const Logistics = require("../models/logistics");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Block a user
const blockUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { blocked: true },
    { new: true }
  );
  res.json(user);
};

// Unblock a user
const unblockUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { blocked: false },
    { new: true }
  );
  res.json(user);
};

// Get all crops
const getAllCrops = async (req, res) => {
  const crops = await Crop.find().populate("farmer", "name email");
  res.json(crops);
};

// Block a crop
const blockCrop = async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(
    req.params.id,
    { status: "blocked" },
    { new: true }
  );
  res.json(crop);
};

// Get analytics data
const getAnalytics = async (req, res) => {
  const totalCrops = await Crop.countDocuments();
  const totalVolume = await Crop.aggregate([
    { $group: { _id: null, total: { $sum: "$quantityInQuintals" } } }
  ]);
  const revenue = await Logistics.aggregate([
    { $group: { _id: null, total: { $sum: "$expectedPricePerQuintal" } } }
  ]);
  res.json({
    totalCrops,
    totalVolume: totalVolume[0]?.total || 0,
    revenue: revenue[0]?.total || 0
  });
};

// Get location analytics
const getLocationAnalytics = async (req, res) => {
  // Group crops by location and count
  const data = await Crop.aggregate([
    { $group: { _id: "$location", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json(data);
};

// Get type analytics
const getTypeAnalytics = async (req, res) => {
  // Group crops by cropName and count
  const data = await Crop.aggregate([
    { $group: { _id: "$cropName", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json(data);
};

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
  getAllCrops,
  blockCrop,
  getAnalytics,
  getLocationAnalytics,
  getTypeAnalytics,
};