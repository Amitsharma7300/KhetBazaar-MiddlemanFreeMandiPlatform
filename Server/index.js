const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Allowed origins for both local & deployed frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://khetbazaar.vercel.app",
  "https://mandimukt.vercel.app"

];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // ✅ allow cookies/auth headers
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));
app.use("/api/logistics", require("./routes/logisticsRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/price-prediction", require("./routes/predictRoutes"));
app.use("/api/contracts", require("./routes/ContractRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
