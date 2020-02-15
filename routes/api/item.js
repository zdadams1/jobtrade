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
router.get(
  '/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.params.user_id })
      .then(Items => res.json(Items))
      .catch(err => res.status(404).json({ noitemsfound: 'None found' }));
  }
);

// @route   POST api/items
// @desc    Create Item
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('post route hit');
    const { errors, isValid } = validateItemInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.json(errors);
    }

    const user = req.user.id;
    const itemName = req.body.itemname;
    const itemCategory = req.body.itemcategory;
    const itemDescription = req.body.itemdescription;
    const itemImage = req.body.itemimage;

    const newItem = new Item({
      itemname: itemName,
      user: user,
      itemcategory: itemCategory,
      itemdescription: itemDescription,
      itemimage: itemImage
    });

    Profile.findOne({ user: req.user._id }).then(profile => {
      profile.items.push(newItem);
      profile.save();
    });

    newItem.save().then(Item => res.json(Item));
  }
);

// @route   DELETE api/item/:id
// @desc    Delete job item
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Item.findOne({ user: req.user.id }).then(item => {
      Item.findById(req.params.id)
        .then(item => {
          // Check for group owner
          if (item.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          item.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ jobitemnotfound: 'No group found' })
        );
    });
    Profile.findOne({ user: req.user.id }).then(profile => {
      profile.items.findById(req.params.id).then(item => {
        item.remove();
      });
    });
  }
);

module.exports = router;
