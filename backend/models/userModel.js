/** @format */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      headline: { type: String },
      currentPosition: { type: String },
      skills: [{ type: String }],
      goals: [{ type: String }],
      resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
      },
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Pre-save middleware for hashing password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // only hash if password changed
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
