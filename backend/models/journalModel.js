/** @format */

const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  entry: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  mood: {
    type: String,
    enum: ['happy', 'stressed', 'motivated', 'neutral'],
    default: 'neutral',
  },
  skillsDeveloped: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Journal', JournalSchema);
