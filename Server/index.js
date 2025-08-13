const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));
app.use("/api/logistics", require("./routes/logisticsRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/price-prediction", require("./routes/predictRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
