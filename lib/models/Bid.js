const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new mongoose.Schema({
  accepted: {
    type: Boolean,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  auction: {
    type: Schema.Types.ObjectId,
    ref: 'Auction'
  }
});

module.exports = mongoose.model('Bid', bidSchema);
