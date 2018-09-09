const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  groupName: { type: String, required: true, unique: false, lowercase: false },
  groupPassword: { type: String, unique: true, required: true },
  members: { type: [{ name: String, numCorrect: Number, numIncorrect: Number, currentGuess: String, numGuesses: Number }], required: true },
  playlist: { type: [{ url: String, canGuess: [String] }], required: true },
  currentPlaylistIndex: { type: String, required: true },
  created: Date
});

module.exports = mongoose.model('Session', sessionSchema);
