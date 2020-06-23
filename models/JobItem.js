const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobItemSchema = new Schema({
  locname: {
    type: String,
    required: true,
  },
  jobitem: [
    {
      jobitemname: {
        type: String,
        required: true,
      },
      jobitemdescription: {
        type: String,
        required: true,
      },
      jobitemimage: {
        type: String,
        required: false,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = JobItem = mongoose.model('jobItem', JobItemSchema);
