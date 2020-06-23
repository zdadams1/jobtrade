const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Group model
const Item = require('../../models/Item');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateItemInput = require('../../validation/item');

// @route   GET api/items/:user_id
// @desc    Get user items
// @access  Private
// router.get(
//   '/:user_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     User.findById({ _id: req.params.user_id })
//       .then(Items => res.json(Items))
//       .catch(err => res.status(404).json({ noitemsfound: 'None found' }));
//   }
// );

// @route GET api/item/:locname
router.get('/:locname', (req, res) => {
  console.log('hit', req.params.locname);
  const corrected = req.params.locname.replace(' ', '%20');
  Item.findOne({ locname: corrected })
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
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
    const itemFields = {};
    itemFields.users = req.user.id;
    if (req.body.locname) itemFields.users = req.user.id;

    const lowerLocation = req.body.locname.toLowerCase().replace(' ', '%20');
    console.log(lowerLocation, itemFields);

    Item.findOne({ locname: lowerLocation }).then((item) => {
      if (item) {
        Item.findOneAndUpdate(
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

            new Item(newItemFields)
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
  Item.findOne({ locname: corrected }).then((item) => {
    if (item) {
      item.items.push(req.body);
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

// @route   DELETE api/item/:id
// @desc    Delete job item
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Item.findOne({ user: req.user.id }).then((item) => {
      Item.findById(req.params.id)
        .then((item) => {
          // Check for group owner
          if (item.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          item.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ jobitemnotfound: 'No group found' })
        );
    });
    Profile.findOne({ user: req.user.id }).then((profile) => {
      profile.items.findById(req.params.id).then((item) => {
        item.remove();
      });
    });
  }
);

module.exports = router;
