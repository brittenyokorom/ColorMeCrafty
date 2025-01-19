require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');
  const db = client.db('colormecrafty');
  const usersCollection = db.collection('users');

  // Registration endpoint
  app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      console.log('Registering user:', username);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { username, password: hashedPassword, palettes: [] };
      await usersCollection.insertOne(user);
      console.log('User registered successfully:', username);
      res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).send({ message: 'Error registering user' });
    }
  });

  // Login endpoint
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      console.log('Logging in user:', username);
      const user = await usersCollection.findOne({ username });
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

  // Other endpoints...

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});