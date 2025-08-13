const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { placeBid, getBids } = require("../controllers/bidController");
const contract = require("../models/contract");
const Bid = require("../models/Bid");
const Crop = require("../models/Crop");
const User = require("../models/User");

router.post("/:cropId", protect, placeBid);
// GET bids for a particular crop by cropId
router.get('/crop/:cropId', protect, async (req, res) => {
  try {
    const bids = await Bid.find({ crop: req.params.cropId }).populate('buyer', 'name email');
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
});
// Accept a bid
router.post("/:cropId/bids/:bidId/accept", protect, async (req, res) => {
  const crop = await Crop.findById(req.params.cropId);
  if (!crop) return res.status(404).json({ message: "Crop not found" });
  const bid = crop.bids.id(req.params.bidId);
  if (!bid) return res.status(404).json({ message: "Bid not found" });
  bid.status = "accepted";
  await crop.save();
  res.json({ message: "Bid accepted", bid });
});
router.patch("/:bidId/accept", protect, async (req, res) => {
  const bid = await Bid.findByIdAndUpdate(req.params.bidId, { status: "accepted" }, { new: true });
  const crop = await Crop.findById(bid.crop);
  const farmer = await User.findById(crop.farmer);
  const buyer = await User.findById(bid.buyer);

  // Create contract
  const contract = await Contract.create({
    farmer: farmer._id,
    buyer: buyer._id,
    cropType: crop.cropName,
    volume: bid.volume,
    price: bid.price,
    duration: "As per agreement",
    status: "active",
    bid: bid._id,
    crop: crop._id
  });

  res.json({ bid, contract });
});

module.exports = router;
