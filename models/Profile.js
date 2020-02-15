const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  thing: {
    type: String
  },
  locname: {
    type: String
  },
  images: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  jobItems: [
    {
      jobItem: {
        type: Schema.Types.ObjectId,
        ref: 'jobItem'
      },
      jobItemName: {
        type: String,
        required: true
      }
    }
  ],
  items: [
    {
      itemname: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      itemdescription: {
        type: String,
        required: true
      },
      itemimage: {
        type: String,
        required: false
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      itemprice: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
