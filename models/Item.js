const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
});

module.exports = Item = mongoose.model('item', ItemSchema);
