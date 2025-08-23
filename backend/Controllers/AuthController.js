/** @format */

const User = require('../models/userModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');

module.exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password, role = 'user', profile } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }
    if (profile?.resume === '') {
      profile.resume = null;
    }
    const user = await User.create({ name, email, password, role, profile });
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax', // allows cross-origin localhost requests
      secure: false,
    });
    res
      .status(201)
      .json({ message: 'User signed in successfully', success: true, user });
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax', // allows cross-origin localhost requests
      secure: false,
    });
    res
      .status(201)
      .json({ message: 'User logged in successfully', token, success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res) => {
  try {
    // clear JWT cookie
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
    });

    // destroy session if exists
    if (req.session) {
      req.session.destroy((err) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, message: 'Session not destroyed' });
        res.clearCookie('sid'); // session cookie
        return res.json({ success: true, message: 'Logged out successfully' });
      });
    } else {
      // no session, just return success
      return res.json({ success: true, message: 'Logged out successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};
