const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  try {
    // Support Authorization header or cookie
    const authHeader = req.headers["authorization"];
    const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);

    if (!token) {
      return res.json({ status: false, message: "No token provided" });
    }

    // Verify signature
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Lookup user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    return res.json({ status: true, user: user.username });

  } catch (err) {
    return res.json({ status: false, message: "Invalid or expired token" });
  }
};
