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

module.exports.getoneJournal = async (req, res) => {
  try {
    const journal = await Journal.findById({ _id: req.params.id });
    if (!journal) {
      return res.status(404).json({
        status: false,
        message: 'Journal not found',
      });
    }
    res.json(journal);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: 'getJournal Failed',
    });
  }
};
module.exports.setJournal = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ USERID:", req.userId);

    const newJournal = new Journal({ ...req.body, userId: req.userId });
    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    console.error("Journal creation failed:", err);
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports.updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, 
      req.body, 
      { new: true } 
    );

    if (!journal) {
      return res.status(404).json({
        status: false,
        message: 'Journal not found',
      });
    }

    res.json({
      status: true,
      message: 'Journal Updated',
      journal,
    });
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
};

module.exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!journal)
      return res
        .status(404)
        .json({ status: false, message: 'Journal not found' });
    res.json({ status: true, message: 'Journal deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
