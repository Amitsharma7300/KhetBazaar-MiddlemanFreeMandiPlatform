const Bid = require("../models/Bid");

const placeBid = async (req, res) => {
  const { cropId } = req.params;
  const { amount } = req.body;
  const bid = await Bid.create({ crop: cropId, buyer: req.user._id, amount });
  res.status(201).json(bid);
};

const getBids = async (req, res) => {
  const { cropId } = req.params;
  const bids = await Bid.find({ crop: cropId }).populate("buyer", "name");
  res.json(bids);
};

module.exports = { placeBid, getBids };
