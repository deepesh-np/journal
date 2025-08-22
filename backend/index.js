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
    origin: ['http://localhost:5173'],
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
  res.redirect('http://localhost:5173/');
});

app.listen(PORT, () => {
  console.log('App Started');
});
