const express = require("express");
const router = express.Router();

const Bid = require("../models/Bid");
const { protect } = require("../middleware/authMiddleware");
const contract = require("../models/contract");

router.get("/contracts", protect, async (req, res) => {
  // Find contracts where the bid is accepted
  const contracts = await contract.find()
    .populate("farmer buyer bid crop")
    .lean();

  // Filter contracts where bid.status === "accepted"
  const acceptedContracts = contracts.filter(c => c.bid && c.bid.status === "accepted");

  res.json(acceptedContracts);
});

module.exports = router;