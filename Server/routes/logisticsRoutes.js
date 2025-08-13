const express = require("express");
const router = express.Router();
const Logistics = require("../models/logistics");
const Crop = require("../models/Crop");
const { protect } = require("../middleware/authMiddleware");

// Book logistics for a crop and bid
router.post("/book", protect, async (req, res) => {
  const {
    cropId,
    bidId,
    name,
    mobile,
    pickupLocation,
    deliveryLocation,
    expectedDate,
    paymentMode
  } = req.body;

  // ...validation and crop/bid checks...

  const logistics = await Logistics.create({
    crop: cropId,
    bid: bidId,
    farmer: crop.farmer,
    buyer: bid.buyer,
    name,
    mobile,
    pickupLocation,
    deliveryLocation,
    expectedDate,
    paymentMode,
    status: "booked"
  });

  res.status(201).json({ message: "Logistics booked", logistics });
});

module.exports = router;