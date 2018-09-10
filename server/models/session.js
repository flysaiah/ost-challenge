const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  groupName: { type: String, required: true, unique: true, lowercase: false },
  groupAdmin: String,
  groupPassword: { type: String, unique: true, required: true },
  members: { type: [{ name: String, numCorrect: Number, numIncorrect: Number, currentGuess: String, numGuesses: Number }], required: true },
  playlist: { type: [{ url: String, owner: String, canGuess: [String] }], required: true },
  currentPlaylistIndex: { type: Number, required: true },
  created: Date
});

module.exports = mongoose.model('Session', sessionSchema);
