const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  appearances: { type: Number, default: 0 },
  cleansheets: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  pictureUrl: { type: String }  // Firebase image URL
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
