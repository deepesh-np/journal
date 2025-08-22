/** @format */
const Journal = require('../models/journalModel');

module.exports.attachUser = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ status: false, message: 'User not authenticated' });
  }
  req.userId = req.user.id;
  next();
};

module.exports.getJournal = async (req, res) => {
  try {
    const journal = await Journal.find({ userId: req.userId });
    res.json(journal);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'getJournal Failed',
    });
  }
};
module.exports.setJournal = async (req, res) => {
  try {
    const newJournal = new Journal({ ...req.body, userId: req.userId });
    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


// // Update journal (only owner)
// router.put("/:id", userVerification, attachUser, async (req, res) => {
//   try {
//     const journal = await Journal.findOneAndUpdate(
//       { _id: req.params.id, user: req.userId },
//       req.body,
//       { new: true }
//     );
//     if (!journal) return res.status(404).json({ status: false, message: "Journal not found" });
//     res.json(journal);
//   } catch (err) {
//     res.status(500).json({ status: false, message: err.message });
//   }
// });

// // Delete journal (only owner)
// router.delete("/:id", userVerification, attachUser, async (req, res) => {
//   try {
//     const journal = await Journal.findOneAndDelete({ _id: req.params.id, user: req.userId });
//     if (!journal) return res.status(404).json({ status: false, message: "Journal not found" });
//     res.json({ status: true, message: "Journal deleted" });
//   } catch (err) {
//     res.status(500).json({ status: false, message: err.message });
//   }
// });
