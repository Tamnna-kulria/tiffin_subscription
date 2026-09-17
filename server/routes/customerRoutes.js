const express = require("express");

const {
  createCustomer,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCustomer);

module.exports = router;