const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  sender: {
    type: String
  },
  reciever: {
    type: String
  },

  message: {
    type: String
  },
  handle: {
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
  groupId: {
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
});

module.exports = Request = mongoose.model("request", requestSchema);
