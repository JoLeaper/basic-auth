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
  endDate: {
    type: Date,
    required: true
  }, 
});

// auctionSchema.statics.makeBuys = function(auctions) {
// // go through each of the auctions
//   const auctionsWithAverages = auctions.map(auction => {
//     return auction.bids.map(bid => bid.average = (bid.price / bid.quantity));
//   });

//   const auctionsWithSortedAverages = auctions.map(auction => {
//     return auction.bids.sort((bid1, bid2) => (bid1.average > bid2.average) ? 1 : -1);
//   });
// };

module.exports = mongoose.model('Auction', auctionSchema);
