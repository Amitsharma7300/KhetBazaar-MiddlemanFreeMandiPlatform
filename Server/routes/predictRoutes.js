const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";
const API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

// GET /api/crop-prices
router.get("/", async (req, res) => {
  const { state, district, market, commodity, limit = 20, offset = 0 } = req.query;

  try {
    const params = {
      "api-key": API_KEY,
      format: "json",
      limit,
      offset,
    };

    // Add filters dynamically
    if (state) params["filters[state]"] = state;
    if (district) params["filters[district]"] = district;
    if (market) params["filters[market]"] = market;
    if (commodity) params["filters[commodity]"] = commodity;

    const response = await axios.get(API_URL, { params });

    res.json({
      total: response.data.total,
      count: response.data.count,
      records: response.data.records,
    });
  } catch (err) {
    console.error("Error fetching crop prices:", err.message);
    res.status(500).json({ message: "Failed to fetch crop prices" });
  }
});

module.exports = router;
