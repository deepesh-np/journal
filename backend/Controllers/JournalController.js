/** @format */

// controllers/journalController.js
const Journal = require('../models/journalModel');

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const journals = await Journal.find({ user: userId }).sort({
      createdAt: 1,
    });

    const today = new Date();
    const labels = [];
    const wordsPerDay = Array(7).fill(0);
    const moodPerDay = Array(7).fill(0);
    const moodCount = Array(7).fill(0);

    // Streak calculation
    let currentStreak = 0;
    let lastDate = null;

    journals.forEach((journal) => {
      const journalDate = new Date(journal.createdAt).setHours(0, 0, 0, 0);

      // Current streak logic
      if (!lastDate) currentStreak = 1;
      else {
        const diff = journalDate - lastDate;
        if (diff === 86400000) currentStreak++;
        else if (diff > 86400000) currentStreak = 1;
      }
      lastDate = journalDate;

      // 7-day analytics
      for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        day.setHours(0, 0, 0, 0);

        if (journalDate === day.getTime()) {
          wordsPerDay[6 - i] += journal.content.split(' ').length;
          moodPerDay[6 - i] += journal.mood;
          moodCount[6 - i] += 1;
        }
      }
    });

    // Average mood
    for (let i = 0; i < 7; i++) {
      if (moodCount[i] > 0) moodPerDay[i] = moodPerDay[i] / moodCount[i];
    }

    // Labels for last 7 days
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      labels.push(day.toDateString().slice(0, 3)); // Mon, Tue, ...
    }

    res.json({
      currentStreak,
      wordsPerDay,
      moodPerDay,
      labels,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Failed to fetch stats', error: err.message });
  }
};
