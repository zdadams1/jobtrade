const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const crypto = require("crypto");

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
const validateProfileInput = require("../../validation/profile");
const validateRequestInput = require("../../validation/requests");
const validateOptionInput = require("../../validation/options");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "image"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/search
// @desc    Get all profiles
// @access  Public
router.get("/search", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "image"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/handle/:handle/requests
router.get(
  "/requests",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        res.json(profile.requests);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/profile/requests/:request_id
router.get(
  "/requests/:request_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("request id route hit");
    const errors = {};

    Profile.findOne({ user: req.user.id })

      .then(profile => {
        const request = profile.requests.find(request => {
          if (request._id == req.params.request_id) {
            return request;
          }
        });
        res.json(request);
      })
      .catch(err => console.log(err));
  }
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  // upload.single("file"),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    console.log("route hit");
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
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/options
// @desc    Add experience to profile
// @access  Private
router.post(
  "/options",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOptionInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newOpt = {
        category: req.body.category,
        places: req.body.places
      };
      console.log(newOpt);
      if (profile.options) {
        profile.options.pop();
        // Update
        profile.options.unshift(newOpt);
        profile.save().then(profile => res.json(profile));
      } else {
        profile.options.unshift(newOpt);
        profile.save().then(profile => res.json(profile));
      }
    });
  }
);

// @route POST api/profile/handle/:handle/requests
// @desc create group request to user by handle
router.post(
  "/handle/:handle/requests",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("post hit", req.body);

    // const { errors, isValid } = validateRequestInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   console.log(errors);
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    Profile.findOne({ handle: req.params.handle }).then(profile => {
      console.log("profile found", req.user.id, req.body, req.params.handle);
      const newReq = {
        message: req.body.message,
        username: req.user.name,
        user: req.user.id,
        requestValue: req.body.requestvalue
      };
      console.log(newReq);
      profile.requests.unshift(newReq);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route POST api/profile/requests/:request_id
router.post(
  "/requests/comment/:request_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("post comment");
    // const { errors, isValid } = validateRequestInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newComment = {
        message: req.body.message,
        username: req.user.name
      };

      const request = profile.requests.find(request => {
        if (request._id == req.params.request_id) {
          request.comments.unshift(newComment);
          return request;
        }
      });
      res.json(request);
    });
  }
);

// @route DELETE api/profile/requests/:request_id
router.delete(
  "/requests/:request_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("delete route hit", req.params.request_id);
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.requests
          .map(item => item._id.toString())
          .indexOf(req.params.request_id);
        console.log(removeIndex);

        // Splice out of array
        profile.requests.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
        console.log("Success!");
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/option/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/option",
  passport.authenticate("jwt", { session: false }),
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
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
