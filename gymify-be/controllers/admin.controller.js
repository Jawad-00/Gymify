const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register Admin (use only once)
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });

    const admin = await Admin.create({ username, password });
    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
