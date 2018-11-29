const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  groupname: {
    type: String,
    required: true
  },
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
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
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Group = mongoose.model("group", GroupSchema);
