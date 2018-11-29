const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Profile model
const Profile = require("../../models/Profile");

// Request model
const Request = require("../../models/Request");

// Validation
const validateRequestInput = require("../../validation/requests");

// @route   GET api/requests/:request_id
// @desc    Get user request
// @access  Private
router.get(
  "/:request_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.findById({ _id: req.params.request_id })
      .then(request => res.json(request))
      .catch(err =>
        res.status(404).json({ norequestfound: "No request found" })
      );
  }
);

// @route GET api/requests
router.get("/", passport.authenticate("jwt", { session: true }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      res.json(profile.requests);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/requests/:handle
// @desc    Create request
// @access  Private
router.post(
  "/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("request post route hit", req.body);
    const { errors, isValid } = validateRequestInput(req.body);

    if (errors) {
      console.log(errors);
    }
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newRequest = new Request({
      sender: req.body.sender,
      reciever: req.body.reciever,
      message: req.body.message,
      requestValue: req.body.requestvalue,
      handle: req.body.handle,
      user: req.body.user,
      username: req.body.username,
      groupId: req.body.groupId
    });
    console.log(newRequest);

    newRequest.save().catch(err => console.log(err));

    Profile.findOne({ user: req.user._id }).then(profile => {
      console.log("profile found", req.user.id, req.body);
      const newReq = {
        request: newRequest._id,
        message: req.body.message,
        username: req.body.username,
        user: req.body.user,
        requestValue: req.body.requestvalue,
        handle: req.body.handle,
        groupId: req.body.groupId
      };
      console.log(newReq);
      profile.requests.unshift(newReq);
      profile.save();
    });
    Profile.findOne({ handle: req.params.handle })
      .then(profile => {
        console.log("profile found", req.user.id, req.body, req.params.handle);
        const newReq = {
          request: newRequest._id,
          message: req.body.message,
          username: req.body.username,
          user: req.body.user,
          requestValue: req.body.requestvalue,
          handle: req.body.handle,
          groupId: req.body.groupId
        };
        console.log(newReq);
        profile.requests.unshift(newReq);
        profile.save();
      })
      .then(request => res.json(request))

      .catch(err => console.log(err));
  }
);

// @route   POST api/requests/comment/:request_id
// @desc    Add comment to request
// @access  Private
router.post(
  "/comment/:request_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRequestInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Request.findById({ _id: req.params.request_id })
      .then(request => {
        const newComment = {
          message: req.body.message,
          username: req.body.username,
          user: req.user.id
        };

        // Add to comments array
        request.comments.unshift(newComment);

        // Save
        request.save().then(request => res.json(request));
      })
      .catch(err =>
        res.status(404).json({ requestnotfound: "No request found" })
      );
  }
);

// @route DELETE api/requests/:request_id
router.delete(
  "/:request_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("delete route hit", req.params.request_id);

    Request.findById(req.params.request_id)
      .then(request => {
        // Delete
        Profile.findOne({ user: request.sender }).then(profile => {
          // Get remove index
          const removeIndex = profile.requests
            .map(item => item.request.toString())
            .indexOf(req.params.request_id);
          console.log(removeIndex);

          // Splice out of array
          profile.requests.splice(removeIndex, 1);

          // Save
          profile.save();
        });
        console.log("sender:", request.sender, "reciever", request.reciever);

        Profile.findOne({ user: request.reciever }).then(profile => {
          // Get remove index
          const removeIndex = profile.requests
            .map(item => item.request.toString())
            .indexOf(req.params.request_id);
          console.log(removeIndex);

          // Splice out of array
          profile.requests.splice(removeIndex, 1);

          // Save
          profile.save();
        });
        request.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ requestnotfound: "No request found" })
      );
  }
);

module.exports = router;
