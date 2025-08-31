const jwt = require('jsonwebtoken');
const JWT_CONFIG = require('../config/jwt');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_CONFIG.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin
};
