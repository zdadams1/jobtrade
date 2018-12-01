const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Group model
const Group = require("../../models/Group");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateGroupInput = require("../../validation/group");
const validateMessageInput = require("../../validation/message");

// @route   GET api/groups/:user_id
// @desc    Get user groups
// @access  Private
router.get(
  "/:group_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findById({ _id: req.params.group_id })
      .then(group => res.json(group))
      .catch(err => res.status(404).json({ nogroupfound: "No groups found" }));
  }
);

// @route   POST api/groups
// @desc    Create group
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("post route hit");
    const { errors, isValid } = validateGroupInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.json(errors);
    }

    const user1 = req.user.id;
    const user2 = req.body.requestee;

    const newGroup = new Group({
      groupname: req.body.groupname,
      users: user1
    });
    newGroup.users.push(user2);

    console.log(newGroup);

    const profileGroup = {
      groupname: req.body.groupname,
      _id: newGroup._id
    };

    Profile.findOne({ user: req.user._id }).then(profile => {
      profile.groups.push(profileGroup);
      profile.save();
    });
    Profile.findOne({ user: req.body.requestee }).then(profile => {
      profile.groups.push(profileGroup);
      profile.save();
    });

    newGroup.save().then(group => res.json(group));
  }
);

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findOne({ _id: req.params.id }).then(group => {
      const newUser = req.user._id;
      group.users.push(newUser);
      group.save().then(group => res.json(group));

      Profile.findOne({ user: req.user._id }).then(profile => {
        const newGroup = {
          _id: group._id,
          groupname: group.groupname
        };
        profile.groups.push(newGroup);
        profile.save();
      });
    });
  }
);

// @route   DELETE api/groups/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findOne({ user: req.user.id }).then(group => {
      Group.findById(req.params.id)
        .then(group => {
          // Check for group owner
          if (group.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          group.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ groupnotfound: "No group found" })
        );
    });
  }
);

// @route   POST api/groups/comment/:id
// @desc    Add comment to group
// @access  Private
router.post(
  "/comment/:group_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Group.findById({ _id: req.params.group_id })
      .then(group => {
        console.log("group found!");
        const newComment = {
          message: req.body.message,
          username: req.body.username,
          user: req.user.id
        };

        // Add to comments array
        group.comments.unshift(newComment);

        // Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json({ groupnotfound: "No group found" }));
  }
);

// @route   DELETE api/groups/comment/:id/:comment_id
// @desc    Remove comment from group
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findById(req.params.id)
      .then(group => {
        // Check to see if comment exists
        if (
          group.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = group.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        group.comments.splice(removeIndex, 1);

        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json({ groupnotfound: "No group found" }));
  }
);

// Create leave group route

// @route DELETE api/groups/:group_id
router.delete(
  "/:group_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("delete route hit", req.params.request_id);
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.requests
        .map(item => item._id.toString())
        .indexOf(req.params.request_id);
      console.log(removeIndex);

      // Splice out of array
      profile.requests.splice(removeIndex, 1);

      // Save
      profile.save();
    });
    Group.findById(req.params.group_id)
      .then(group => {
        // Delete
        group.remove().then(() => res.json({ success: true }));
      })

      .catch(err =>
        res.status(404).json({ requestnotfound: "No request found" })
      );
  }
);

module.exports = router;
