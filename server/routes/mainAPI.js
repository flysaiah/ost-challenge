const express = require('express');
const router = express.Router();
const Session = require('../models/session.js')

module.exports = (router) => {

  router.post('/fetchSessionData', (req, res) => {
    Session.findOne({ groupName: "Goons 98" }, (err, session) => {
      if (err) {
        res.json({ success: false, err: err });
      } else {
        res.json({ success: true, session: session });
      }
    });
  });

  return router;
}
