const { Router } = require('express');
const Bid = require('../models/Bid');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Bid
      .findOneAndUpdate({
        price: req.body.price,
        quantity: req.body.quantity
      }, {
        user: req.user._id,
        ...req.body
      }, {
        new: true, upsert: true
      })
      .then(bid => res.send(bid))
      .catch(next);
  })
  .get('/:id', ensureAuth, async(req, res, next) => {
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
  .delete('/:id', ensureAuth, async(req, res, next) => {
    Bid
      .findByIdAndDelete(req.params.id)
      .then(bid => res.send(bid))
      .catch(next);
  });
