const express = require('express');
const router = express.Router();
const Session = require('../models/session.js')

module.exports = (router) => {

  router.post('/fetchSessionData', (req, res) => {
    Session.findOne({ groupName: req.body.groupName }, (err, session) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!session) {
        res.json({ success: false, message: "Group not found" });
      } else {
        res.json({ success: true, session: session });
      }
    });
  });

  router.post('/testt', (req, res) => {
    res.json({success: true, message: "YAYAYAYAY"})
  });

  router.post('/createGroup', (req, res) => {
    let session = new Session({
      groupName: req.body.groupName,
      groupAdmin: req.body.newUser,
      groupPassword: req.body.groupPassword,
      members: [{ name: req.body.newUser, numCorrect: 0, numIncorrect: 0, newGuess: "", waitingOnEval: false, numGuesses: 3, guessStatus: 1 }],
      playlist: [],
      currentPlaylistIndex: 0,
      created: new Date()
    })
    session.save((err) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true });
      }
    });
  });

  router.post('/joinGroup', (req, res) => {
    const newMember = { name: req.body.newUser, numCorrect: 0, numIncorrect: 0, newGuess: "", waitingOnEval: false, numGuesses: 3, guessStatus: 1 }
    Session.findOneAndUpdate({ groupPassword: req.body.groupPassword }, { $push: { members: newMember } }, (err, session) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!session) {
        res.json({ success: false, message: "Group not found" });
      } else {
        res.json({ success: true, groupName: session.groupName });
      }
    });
  });

  router.post('/setNewPlaylistIndex', (req, res) => {
    Session.findOne({ groupName: req.body.groupName }, (err, session) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!session) {
        res.json({ success: false, message: "Group not found" });
      } else {
        console.log("---HERE---");
        console.log(session);
        for (let groupMember of session.members) {
          if (session.playlist.length) {
            // Update numCorrect/numIncorrect for each member
            let shouldEval = false;
              for (let member of session.playlist[session.currentPlaylistIndex].canGuess) {
                if (member === groupMember.name) {
                  shouldEval = true;
                  break;
                }
              }
            if (shouldEval) {
              if (groupMember.guessStatus === 3) {
                groupMember.numCorrect += 1;
              } else {
                groupMember.numIncorrect += 1;
              }
            }
          }
          groupMember.numGuesses = 3;
          groupMember.newGuess = "";
          groupMember.guessStatus = 1;
          groupMember.waitingOnEval = false;
        }
        Session.findOneAndUpdate({ groupName: req.body.groupName }, { $set: { members: session.members, currentPlaylistIndex: req.body.currentPlaylistIndex } }, (err, session) => {
          if (err) {
            res.json({ success: false, message: err });
          } else if (!session) {
            res.json({ success: false, message: "Group not found" });
          } else {
            res.json({ success: true });
          }
        });
      }
    });
  });

  router.post('/makeGuess', (req, res) => {
    Session.findOne({ groupName: req.body.groupName }, (err, session) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!session) {
        res.json({ success: false, message: "Group not found" });
      } else {
        for (let groupMember of session.members) {
          if (groupMember.name === req.body.name) {
            groupMember.newGuess = req.body.newGuess;
            groupMember.waitingOnEval = true;
            groupMember.numGuesses -= 1;
          }
        }
        Session.findOneAndUpdate({ groupName: req.body.groupName }, { $set: { members: session.members } }, (err, session) => {
          if (err) {
            res.json({ success: false, message: err });
          } else if (!session) {
            res.json({ success: false, message: "Group not found" });
          } else {
            res.json({ success: true });
          }
        });
      }
    });
  });

  router.post('/evaluateGuess', (req, res) => {
    Session.findOne({ groupName: req.body.groupName }, (err, session) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!session) {
        res.json({ success: false, message: "Group not found" });
      } else {
        for (let groupMember of session.members) {
          if (groupMember.name === req.body.memberName) {
            groupMember.waitingOnEval = false;
            groupMember.guessStatus = req.body.guessStatus;
          }
        }
        Session.findOneAndUpdate({ groupName: req.body.groupName }, { $set: { members: session.members } }, (err, session) => {
          if (err) {
            res.json({ success: false, message: err });
          } else if (!session) {
            res.json({ success: false, message: "Group not found" });
          } else {
            res.json({ success: true });
          }
        });
      }
    });
  });

  router.post('/addVideoToPlaylist', (req, res) => {
    Session.findOneAndUpdate({ groupName: req.body.groupName }, { $push: { playlist: req.body.newTrack } }, { new: true }, (err, session) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!session) {
        res.json({ success: false, message: "Group not found" });
      } else {
        res.json({ success: true, playlist: session.playlist });
      }
    });
  });

  router.post('/disbandGroup', (req, res) => {
    Session.findOne({ groupName: req.body.groupName }, (err, session) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!session) {
        res.json({ success: false, message: "Group not found" });
      } else {
        session.remove(err => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, groupName: session.groupName });
          }
        });
      }
    });
  });

  return router;
}