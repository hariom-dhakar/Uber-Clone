const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blackListToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorization" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorization" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorization" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = (req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null))?.trim();

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.decode(token, { complete: true });
  
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (err) {
    console.log(err);

    res.status(401).json({ message: "Unauthorized" });
  }
};
