const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  bids: [{
    type: Schema.Types.ObjectId,
    ref: 'Bid'
  }],
},

{ timestamps: {
  createdAt: 'purchaseDate',
  updatedAt: 'lastPourDate'
} });

module.exports = mongoose.model('Auction', auctionSchema);
