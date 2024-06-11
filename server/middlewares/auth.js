// middleware/AuthMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../models/UserModel');

const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded._id);
    if (!req.user) {
      return res.status(401).json({ msg: 'User does not exist' });
    }
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = { authMiddleware };