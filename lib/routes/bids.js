const { Router } = require('express');
const Bid = require('../models/Bid');

module.exports = Router()
  .post('/', async(req, res, next) => {
    Bid
      .create(req.body)
      //     .populate('user')
      //     .populate('auction')
      .then(bid => res.send(bid))
      .catch(next);
  })
  .get('/:id', async(req, res, next) => {
    Bid
      .findById(req.params.id)
      .select({
        price: true,
        quantity: true,
        user: true,
        auction: true
      })
      .populate('user')
      .populate('auction')
      .then(bid => res.send(bid))
      .catch(next);
  })
  .delete('/:id', async(req, res, next) => {
    Bid
      .findByIdAndDelete(req.params.id)
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
