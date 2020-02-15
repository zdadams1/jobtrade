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
const validateProfileInput = require('../../validation/profile');
const validateRequestInput = require('../../validation/requests');
const validateOptionInput = require('../../validation/options');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'image'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  // upload.single("file"),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    console.log('route hit');
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.thing) profileFields.thing = req.body.thing;
    if (req.body.locname) profileFields.locname = req.body.locname;
    if (req.body.jobItem) profileFields.jobItem = req.body.jobItem;
    if (req.file) profileFields.image = req.file;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        upload(req, res, err => {
          if (err) {
            console.log(err);
          }
          console.log(req.file);
        });
        console.log(profileFields.image);

        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        });
      }
    });
  }
);

// POST api/profile/location
router.post(
  '/location',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const locFields = {};
    if (req.body.locname) locFields.locname = req.body.locname;

    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: locFields },
      { new: true }
    ).then(profile => res.json(profile));
  }
);

// @route   POST api/profile/jobItem
// @desc    Add job item to profile
// @access  Private
router.post(
  '/job-item',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOptionInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newJobItem = {
        jobItemName: req.body.name,
        description: req.body.description,
        image: req.body.image
      };
      console.log(newOpt);
      if (profile.options) {
        profile.options.pop();
        // Update
        profile.jobItem.unshift(newJobItem);
        profile.save().then(profile => res.json(profile));
      } else {
        profile.jobItem.unshift(newJobItem);
        profile.save().then(profile => res.json(profile));
      }
    });
  }
);

// @route   DELETE api/profile/job-item/:item_id
// @desc    Delete job item from profile
// @access  Private
router.delete(
  '/job-item/:item_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.options
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.options.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
