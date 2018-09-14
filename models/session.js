const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  groupName: { type: String, required: true, unique: true, lowercase: false },
  groupPassword: { type: String, unique: true, required: true },
  members: { type: [{ name: String, numCorrect: Number, numIncorrect: Number, newGuess: String, guessStatus: Number, waitingOnEval: Boolean, numGuesses: Number, readyForNext: Boolean }], required: true },
  playlist: { type: [{ url: String, owner: String, canGuess: [String] }], required: true },
  currentPlaylistIndex: { type: Number, required: true },
  created: Date
});

module.exports = mongoose.model('Session', sessionSchema);
