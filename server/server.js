const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Tiffin Subscription API is running",
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});