const { Router } = require('express');
const Bid = require('../models/Bid');

module.exports = Router()
  .post('/', async(req, res, next) => {
    Bid
      .create(req.body)
      .then(bid => res.send(bid))
      .catch(next);
  });
// .get('/', (req, res, next) => {
//   Auction
//     .find()
//     .then(auctions => res.send(auctions))
//     .catch(next);
// })
// .get('/:id', (req, res, next) => {
//   Auction
//     .findById(req.params.id)
//     .select({
//       title: true,
//       description: true,
//       quantity: true,
//       endDate: true,
//       user: true,
//       bids: true
//     })
//     .populate('user')
//     .then(auction => res.send(auction))
//     .catch(next);
// });
