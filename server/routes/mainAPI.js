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

  router.post('/createGroup', (req, res) => {
    let newSession = new Session({
      groupName: req.body.groupName,
      groupPassword: req.body.groupPassword,
      members: [{ name: req.body.newUser, numCorrect: 0, numIncorrect: 0 }],
      playlist: [],
      currentPlaylistIndex: 0,
      created: new Date()
    })
    newSession.save((err) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true });
      }
    });
  });

  router.post('/joinGroup', (req, res) => {
    const newMember = { name: req.body.newUser, numCorrect: 0, numIncorrect: 0 }
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
