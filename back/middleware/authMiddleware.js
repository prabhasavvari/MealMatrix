const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


exports.authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = await decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
