const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  blockUser,
  unblockUser,
  getAllCrops,
  blockCrop,
  getAnalytics,
  getLocationAnalytics,
  getTypeAnalytics
} = require("../controllers/adminController");

// adminRoutes.js


router.get("/users", protect, adminOnly, getAllUsers);
router.patch("/users/:id/block", protect, adminOnly, blockUser);
router.patch("/users/:id/unblock", protect, adminOnly, unblockUser);
router.get("/crops", protect, adminOnly, getAllCrops);
router.patch("/crops/:id/block", protect, adminOnly, blockCrop);
router.get("/analytics", protect, adminOnly, getAnalytics);
router.get("/location-analytics", protect, adminOnly, getLocationAnalytics);
router.get("/type-analytics", protect, adminOnly, getTypeAnalytics);

module.exports = router;