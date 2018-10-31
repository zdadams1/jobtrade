const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  thing: {
    type: String
  },
  images: [
    {
      type: String
    }
  ],
  options: [
    {
      category: {
        type: String,
        required: true
      },
      places: [
        {
          type: String
        }
      ]
    }
  ],
  requests: [
    {
      message: {
        type: String
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      username: {
        type: String
      },
      requestValue: {
        type: String
      },
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          message: {
            type: String,
            required: true
          },
          username: {
            type: String
          },
          image: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    }
  ],
  groups: [
    {
      group: {
        type: Schema.Types.ObjectId,
        ref: "groups"
      },
      groupname: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
