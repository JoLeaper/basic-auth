const { Router } = require('express');
const Auction = require('../models/Auction');

module.exports = Router()
  .post('/', async(req, res, next) => {
    Auction
      .create(req.body)
      .then(auction => res.send(auction))
      .catch(next);
  });
// .get('/', (req, res, next) => {
//   Bottle
//     .find()
//     .select({
//       _id: true,
//       product: true
//     })
//     .then(bottles => res.send(bottles))
//     .catch(next);
// })
// .get('/:id', (req, res, next) => {
//   Bottle
//     .findById(req.params.id)
//     .populate('product')
//     .then(bottles => res.send(bottles))
//     .catch(next);
// });
