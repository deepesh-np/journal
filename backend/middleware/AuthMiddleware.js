const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);

    if (!token) return res.status(401).json({ status: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ status: false, message: "User not found" });

    req.user = user; // attach user for downstream middlewares
    next();          // essential
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
};

module.exports = { userVerification };
