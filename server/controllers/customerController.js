const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // Validate required fields
    if (!name || !phone || !address) {
      return res.status(400).json({
        message: "Name, phone and address are required",
      });
    }

    // Create customer using logged-in owner's ID
    const customer = await Customer.create({
      ownerId: req.ownerId,
      name,
      phone,
      address,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    console.error("Create customer error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createCustomer,
};