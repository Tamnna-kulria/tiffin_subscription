const express = require("express");

const {
  registerOwner,
  loginOwner,
  getMe,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerOwner);

router.post("/login", loginOwner);

router.get("/me", protect, getMe);

module.exports = router;