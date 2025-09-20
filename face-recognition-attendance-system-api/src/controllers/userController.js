const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create new user
// @route   POST /api/users
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
};
