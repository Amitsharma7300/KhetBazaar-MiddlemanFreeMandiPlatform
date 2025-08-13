const Crop = require("../models/Crop");
const Logistics = require("../models/logistics");

// Add a new crop
const addCrop = async (req, res) => {
  try {
    const {
      title,
      cropType,
      variety,
      grade,
      quantity,
      unit,
      price,
      harvestDate,
      location,
      irrigationType,
      soilType,
      organic,
      description,
      image
    } = req.body;

    // Create crop
    const crop = await Crop.create({
      farmer: req.user._id, // Authenticated farmer
      title,
      cropType,
      variety,
      grade,
      quantity,
      unit,
      price,
      harvestDate,
      location,
      irrigationType,
      soilType,
      organic,
      description,
      image
    });

    res.status(201).json(crop);
  } catch (err) {
    console.error("Error adding crop:", err);
    res.status(500).json({ message: "Failed to add crop" });
  }
};

// Get all crops with farmer & bids
const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate("farmer", "name phone")
      .populate({
        path: "bids",
        populate: { path: "buyer", select: "name phone" }
      });

    res.json(crops);
  } catch (err) {
    console.error("Error fetching crops:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all crops with logistics
const getAllCropsWithLogistics = async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate("farmer", "name phone")
      .populate({
        path: "bids",
        populate: { path: "buyer", select: "name phone" }
      })
      .lean();

    const cropsWithLogistics = await Promise.all(
      crops.map(async (crop) => {
        const logistics = await Logistics.findOne({ crop: crop._id }).lean();
        return { ...crop, logistics: logistics || null };
      })
    );

    res.json(cropsWithLogistics);
  } catch (err) {
    console.error("Error fetching crops with logistics:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addCrop, getAllCrops, getAllCropsWithLogistics };
