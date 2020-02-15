const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Group model
const JobItem = require('../../models/JobItem');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateJobItemInput = require('../../validation/jobitem');

// @route   GET api/job-items/:locname
// @desc    Get job items
// @access  Private
router.get(
  '/:locname',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    JobItem.findAll({ locname: req.params.locname })
      .then(jobItems => res.json(jobItems))
      .catch(err => res.status(404).json({ nojobitemsfound: 'None found' }));
  }
);

// @route   POST api/job-items
// @desc    Create Job Item
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('post route hit');
    const { errors, isValid } = validateJobItemInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.json(errors);
    }

    const user = req.user.id;
    const jobItemName = req.body.name;
    const description = req.body.description;
    const image = req.body.image;

    const newJobItem = new JobItem({
      jobItemName: jobItemName,
      user: user,
      description: description,
      image: image
    });

    Profile.findOne({ user: req.user._id }).then(profile => {
      profile.jobItems.push(newJobItem);
      profile.save();
    });

    newJobItem.save().then(jobItem => res.json(jobItem));
  }
);

// @route   DELETE api/job-items/:id
// @desc    Delete job item
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    JobItem.findOne({ user: req.user.id }).then(jobItem => {
      JobItem.findById(req.params.id)
        .then(jobItem => {
          // Check for group owner
          if (jobItem.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          jobItem.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ jobitemnotfound: 'No group found' })
        );
    });
  }
);

module.exports = router;
