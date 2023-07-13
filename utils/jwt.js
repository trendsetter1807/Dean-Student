const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

// Generate JWT token
exports.generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

// Verify JWT token
exports.verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
