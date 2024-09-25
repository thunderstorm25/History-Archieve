const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your secret key
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
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
