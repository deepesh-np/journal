const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true }, // hashed OTP
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("Otp", otpSchema);
