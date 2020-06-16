const { Router } = require('express');
const Auction = require('../models/Auction');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Auction
      .create(
        {
          user: req.user._id,
          ...req.body
        })
      .then(auction => res.send(auction))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Auction
      .find()
      .then(auctions => res.send(auctions))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    Auction
      .findById(req.params.id)
      .select({
        title: true,
        description: true,
        quantity: true,
        endDate: true,
        user: true,
        bids: true
      })
      .populate('user')
      .then(auction => res.send(auction))
      .catch(next);
  });
