const express = require("express");

const {
  createCustomer,
  getCustomers,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCustomer);

router.get("/", protect, getCustomers);

module.exports = router;