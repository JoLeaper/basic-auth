const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', async(req, res, next) => {
    User
      .create(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
