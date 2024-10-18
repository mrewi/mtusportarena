const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const playersRoutes = require('./routes/playerRoute');
const teamsRoutes = require('./routes/teamRoute');
const matchesRoutes = require('./routes/matchesRoute');
const uploadRoutes = require('./routes/uploadRoute');

require('dotenv').config();
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
// routes
app.use('/players', playersRoutes);
app.use('/teams', teamsRoutes);
app.use('/matches', matchesRoutes);
app.use('/upload', uploadRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Test route
app.get('/', (req, res) => {
  res.send('MLS API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
