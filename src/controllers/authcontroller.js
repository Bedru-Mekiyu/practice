const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: `User ${username} registered successfully` });
  } catch (error) {
    console.error(error); // optional for debugging
    res.status(500).json({ error: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error); // optional for debugging
    res.status(500).json({ error: 'Server error during login' });
  }
};

module.exports = { register, login };
