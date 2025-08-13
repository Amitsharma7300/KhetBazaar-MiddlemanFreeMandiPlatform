const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");
const Logistics = require("../models/logistics");
const { protect } = require("../middleware/authMiddleware");
const {
  addCrop,
  getAllCropsWithLogistics,
} = require("../controllers/cropController");

// =======================
// GET all crops with logistics
// =======================
router.get("/", protect, getAllCropsWithLogistics);

// =======================
// ADD a new crop
// =======================
router.post("/", protect, addCrop);

// =======================
// PLACE a bid on a crop
// =======================
router.post("/:id/bid", protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    if (crop.farmer.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot bid on your own crop" });
    }

    const bid = {
      buyer: req.user._id,
      amount: req.body.amount,
      status: "pending",
    };

    crop.bids.push(bid);
    await crop.save();

    const populatedCrop = await Crop.findById(crop._id)
      .populate("farmer", "name phone")
      .populate("bids.buyer", "name phone");

    res.status(200).json({
      message: "Bid placed successfully",
      crop: populatedCrop,
    });
  } catch (err) {
    console.error("Error placing bid:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// ACCEPT a bid
// =======================
router.post("/:cropId/bids/:bidId/accept", protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.cropId);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the farmer can accept bids" });
    }

    const bid = crop.bids.id(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    bid.status = "accepted";
    await crop.save();

    // Create logistics booking
    const logistics = await Logistics.create({
      crop: crop._id,
      bid: bid._id,
      farmer: crop.farmer,
      buyer: bid.buyer,
      pickupLocation: crop.location,
      deliveryLocation: req.body.deliveryLocation || "Set by buyer",
      pickupDate: req.body.pickupDate || new Date(),
      deliveryDate: req.body.deliveryDate || null,
      status: "booked",
    });

    res.status(200).json({
      message: "Bid accepted and logistics booked",
      bid,
      logistics,
    });
  } catch (err) {
    console.error("Error accepting bid:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// REJECT a bid
// =======================
router.post("/:cropId/bids/:bidId/reject", protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.cropId);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the farmer can reject bids" });
    }

    const bid = crop.bids.id(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    bid.status = "rejected";
    await crop.save();

    res.status(200).json({ message: "Bid rejected", bid });
  } catch (err) {
    console.error("Error rejecting bid:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// BOOK logistics (optional direct booking)
// =======================
router.post("/book", protect, async (req, res) => {
  try {
    const { cropId, bidId, pickupLocation, deliveryLocation, pickupDate } =
      req.body;

    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    const bid = crop.bids.id(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const logistics = await Logistics.create({
      crop: crop._id,
      bid: bid._id,
      farmer: crop.farmer,
      buyer: bid.buyer,
      pickupLocation: pickupLocation || crop.location,
      deliveryLocation: deliveryLocation || "Set by buyer",
      pickupDate: pickupDate || new Date(),
      deliveryDate: null,
      status: "booked",
    });

    res.status(201).json({
      message: "Logistics booked successfully",
      logistics,
    });
  } catch (err) {
    console.error("Error booking logistics:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
