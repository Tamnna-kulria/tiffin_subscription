const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Owner = require("../models/Owner");

// Generate JWT token
const generateToken = (ownerId) => {
  return jwt.sign(
    { ownerId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register owner
const registerOwner = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if owner already exists
    const existingOwner = await Owner.findOne({ email });

    if (existingOwner) {
      return res.status(400).json({
        message: "Owner with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create owner
    const owner = await Owner.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(owner._id);

    res.status(201).json({
      message: "Owner registered successfully",
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Login owner
const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find owner
    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      owner.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(owner._id);

    res.status(200).json({
      message: "Login successful",
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get current owner
const getMe = async (req, res) => {
  try {
    const owner = await Owner.findById(req.ownerId).select("-password");

    if (!owner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    res.status(200).json({
      owner,
    });
  } catch (error) {
    console.error("Get me error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  registerOwner,
  loginOwner,
  getMe,
};