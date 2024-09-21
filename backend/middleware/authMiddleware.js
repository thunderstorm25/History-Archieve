const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify Token Middleware
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Admin Check Middleware
exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (req.user.role_id === 1) { // Assuming '1' is Admin role
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
