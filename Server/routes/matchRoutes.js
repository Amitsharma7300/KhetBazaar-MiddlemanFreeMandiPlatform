// In routes/matchRoutes.js
router.post("/match", protect, async (req, res) => {
  const { cropType, location, volume } = req.body;
  // Find farmers with matching crops, sorted by proximity and volume
  const farmers = await Crop.find({
    cropName: cropType,
    location: location,
    quantityInQuintals: { $gte: volume }
  }).populate("farmer");
  res.json(farmers);
});