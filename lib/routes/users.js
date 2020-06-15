const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', async(req, res, next) => {
    User
      .create(req.body)
      .then(user => res.send(user))
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
