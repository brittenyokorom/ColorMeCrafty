require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User'); // Ensure you have a User model defined
const authenticateToken = require('./middleware/auth'); // Import the middleware
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());
app.use(cors());

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ColorMeCrafty');
    console.log('Connected to ColorMeCrafty database');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

connectToDatabase();

app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Registering user:', username);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, palettes: [] });
    await user.save();
    console.log('User registered successfully:', username);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Logging in user:', username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).send({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return res.status(400).send({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    console.log('User logged in successfully:', username);
    res.send({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send({ message: 'Error logging in user' });
  }
});

// Get user data endpoint
app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    console.log('Fetching user data for:', username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({
      username: user.username,
      palettes: user.palettes
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send({ message: 'Error fetching user data' });
  }
});

// Get user profile endpoint
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  const { userId } = req.user;
  try {
    console.log('Fetching user data for:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({
      username: user.username,
      palettes: user.palettes
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send({ message: 'Error fetching user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});