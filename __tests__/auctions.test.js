const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');

const User = require('../lib/models/User');

describe('basic-auth routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('creates an action', async() => {
    const user1 = await User.create({
      email: 'jj@gmail.com',
      password: 'jjissupercool'
    });

    return request(app)
      .post('/api/v1/auctions/')
      .send({
        title: 'The First Auction!',
        description: 'This is the first auction!',
        quantity: 25,
        user: user1._id
      }).then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          title: expect.any(String),
          description: expect.any(String),
          quantity: expect.any(Number),
          user: user1._id,
          __v: 0
        });
      });
  });
  
});

// title: {
//   type: String,
//   required: true
// },
// description: {
//   type: String,
//   required: true
// },
// quantity: {
//   type: Number,
//   required: true
// },
// user: {
//   type: Schema.Types.ObjectId,
//   ref: 'User'
// }, 
// bids: [{
//   type: Schema.Types.ObjectId,
//   ref: 'Bid'
// }],
