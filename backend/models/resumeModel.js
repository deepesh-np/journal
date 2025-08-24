/** @format */

const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  rawText: { type: String },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    education: [{ degree: String, institution: String, year: Number }],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        achievements: [String],
      },
    ],
    skills: [String],
    projects: [String],
  },
  analysisReport: {
    score: { type: Number, default: 0 },
    missingSkills: [String],
    atsCompatibility: { type: Number, default: 0 },
    recommendations: [String],
  },
  status: {
    type: String,
    enum: ['uploaded', 'parsed', 'analyzed', 'failed'],
    default: 'uploaded',
  },
  errorLog: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);
