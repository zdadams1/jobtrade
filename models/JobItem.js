const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobItemSchema = new Schema({
  jobItemname: {
    type: String,
    required: true
  },
  jobItemDescription: {
    type: String,
    required: true
  },
  jobItemImage: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = JobItem = mongoose.model('jobItem', JobItemSchema);
