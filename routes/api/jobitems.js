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
    const corrected = req.params.locname.replace(' ', '%20');
    JobItem.findOne({ locname: corrected })
      .then((jobItems) => res.json(jobItems))
      .catch((err) => res.status(404).json({ nojobitemsfound: 'None found' }));
  }
);

// @route   POST api/job-items
// @desc    Create Job Item
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  // upload.single("file"),
  (req, res) => {
    console.log('route hit');
    // Check Validation

    // Get fields
    const itemFields = {};
    itemFields.users = req.user.id;
    if (req.body.locname) itemFields.users = req.user.id;

    const lowerLocation = req.body.locname.toLowerCase().replace(' ', '%20');
    console.log(lowerLocation, itemFields);

    JobItem.findOne({ locname: lowerLocation }).then((item) => {
      if (item) {
        JobItem.findOneAndUpdate(
          { name: lowerLocation },
          { $set: itemFields },
          { new: true }
        ).then((item) => res.json(item));
      } else {
        const locations = require('../../locations');
        const lowerLocations = [];
        for (let i = 0; i < locations.length; i++) {
          lowerLocations.push(locations[i].toLowerCase().replace(' ', '%20'));
          if (lowerLocation === lowerLocations[i]) {
            console.log(lowerLocation, lowerLocations[i], itemFields);
            const newItemFields = {};
            newItemFields.users = req.user.id;
            if (req.user) newItemFields.users = req.user.id;
            if (req.body.locname) newItemFields.locname = lowerLocations[i];
            console.log(newItemFields);

            new JobItem(newItemFields)
              .save()
              .then((item) => res.json(item), console.log(item))
              .catch((err) => console.log(err));
          }
        }
      }
    });
  }
);

router.post('/:locname', (req, res) => {
  const errors = {};
  console.log('get locname');
  const corrected = req.params.locname.replace(' ', '%20');
  console.log(corrected);
  JobItem.findOne({ locname: corrected }).then((item) => {
    if (item) {
      console.log(item, 'item');
      item.jobitem.push(req.body);
      item.save((err) => {
        if (err) sendStatus(500);
        res.sendStatus(200);
      });
    } else {
      new Item(item)
        .save()
        .then((item) => res.json(item), console.log(item))
        .catch((err) => console.log(err));
    }
  });
});

// @route   DELETE api/job-items/:id
// @desc    Delete job item
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    JobItem.findOne({ user: req.user.id }).then((jobItem) => {
      JobItem.findById(req.params.id)
        .then((jobItem) => {
          // Check for group owner
          if (jobItem.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          jobItem.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ jobitemnotfound: 'No group found' })
        );
    });
  }
);

module.exports = router;
