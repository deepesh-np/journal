/** @format */

const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  parsedData: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: Number },
      },
    ],
    experience: [
      {
        company: { type: String },
        role: { type: String },
        duration: { type: String },
        achievements: [{ type: String }],
      },
    ],
    skills: [{ type: String }],
    projects: [{ type: String }],
  },
  analysisReport: {
    score: { type: Number, default: 0 },
    missingSkills: [{ type: String }],
    atsCompatibility: { type: Number, default: 0 },
    recommendations: [{ type: String }],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);
