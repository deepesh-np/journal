/** @format */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const authRoute = require('./Routes/AuthRoute');
const journalRoute = require('./Routes/JournalRoute');
const { userVerification } = require('./middleware/AuthMiddleware');

const url = process.env.MONGO_URL;
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected');
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 3002;

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/journals', userVerification, journalRoute);

const path = require('path');

app.get('/', (req, res) => {
  // res.send('hello');
  res.redirect('http://localhost:5174/');
});
const Resume = require('./models/resumeModel');
const { getResumeTextFromURL } = require('./resumeParser');
const { analyzeResume } = require('./hfClient');
const { attachUser } = require('./middleware/journals');

app.post("/resume/analyze",userVerification, attachUser, async (req, res) => {
  const { fileUrl } = req.body;
  const userId = req.userId;

  let resumeDoc = await Resume.create({ userId, fileUrl });

  try {
    const text = await getResumeTextFromURL(fileUrl);
    const parsedData = await analyzeResume(text);

    resumeDoc = await Resume.findByIdAndUpdate(
      resumeDoc._id,
      { parsedData, rawText: text, status: "analyzed" },
      { new: true }
    );

    res.json(resumeDoc);
  } catch (err) {
    await Resume.findByIdAndUpdate(resumeDoc._id, { status: "failed", errorLog: err.message });
    res.status(500).json({ error: err.message });
  }
});

const User = require("./models/userModel");

app.get("/profile",userVerification, attachUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log('App Started');
});
