const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const isEmpty = require('../../validation/is-empty');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');
const crypto = require('crypto');
const Chat = require('../../models/Chat');

// const db = require("../../config/keys").mongoURI;
// // Create storage engine
// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads"
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });

// Load Validation
const validateLocationInput = require('../../validation/location');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/chat
// @desc    Get current users profile
// @access  Private
// router.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const errors = {};

//     Profile.findOne({ user: req.user.id })
//       .populate('user', ['name', 'image'])
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = 'There is no profile for this user';
//           return res.status(404).json(errors);
//         }
//         res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// @route   GET api/chat/:locname
// @desc    Get profile by handle
// @access  Public

router.get('/:locname', (req, res) => {
  const errors = {};
  console.log('get locname');
  const corrected = req.params.locname.replace(' ', '%20');
  console.log(corrected);

  Chat.findOne({ locname: corrected }).then(chat => {
    console.log('get', chat);
    res.json(chat);
    const io = req.app.get('socketio');
    io.on('connection', socket => {
      chat.messages
        .limit(10)
        .sort({ _id: 1 })
        .toArray((err, res) => {
          if (err) {
            throw err;
          }
          socket.emit('output', res);
        })
        .catch(err => console.log(err));
      socket.on('SEND_MESSAGE', data => {
        let message = data.message;

        chat.insertOne({ message: message }, () => {
          io.emit('RECEIVE_MESSAGE', [data]);
        });
      });
    });
  });
});
// @route   POST api/chat
// @desc    Add to area chat
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  // upload.single("file"),
  (req, res) => {
    const { errors, isValid } = validateLocationInput(req.body);
    console.log('route hit');
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      console.log(errors);
      return res.status(400).json(errors);
    }

    // Get fields
    const chatFields = {};
    chatFields.users = req.user.id;
    if (req.body.locname) chatFields.users = req.user.id;

    const lowerLocation = req.body.locname.toLowerCase().replace(' ', '%20');
    console.log(lowerLocation, chatFields);

    Chat.findOne({ locname: lowerLocation }).then(chat => {
      if (chat) {
        Chat.findOneAndUpdate(
          { name: lowerLocation },
          { $set: chatFields },
          { new: true }
        ).then(chat => res.json(chat));
      } else {
        const locations = require('../../locations');
        const lowerLocations = [];
        for (let i = 0; i < locations.length; i++) {
          lowerLocations.push(locations[i].toLowerCase().replace(' ', '%20'));
          if (lowerLocation === lowerLocations[i]) {
            console.log(lowerLocation, lowerLocations[i], chatFields);
            const newChatFields = {};
            newChatFields.users = req.user.id;
            if (req.user) newChatFields.users = req.user.id;
            if (req.body.locname) newChatFields.locname = lowerLocations[i];
            console.log(newChatFields);

            new Chat(newChatFields)
              .save()
              .then(chat => res.json(chat), console.log(chat))
              .catch(err => console.log(err));
          }
        }
      }
    });
  }
);

// @route   POST api/chat/:location
// @desc    send message in public chat
// @access  Private

module.exports = router;
