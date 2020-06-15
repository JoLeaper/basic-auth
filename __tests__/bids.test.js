const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');

const User = require('../lib/models/User');
const Auction = require('../lib/models/Auction');
const Bid = require('../lib/models/Bid');

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

  
  it('creates a bid', async() => {
    const user1 = await User.create({
      email: 'jj@gmail.com',
      password: 'jjissupercool'
    });

    const user2 = await User.create({
      email: 'jj@gmail.com',
      password: 'jjissupercool'
    });

    const auction1 =  await Auction.create({
      title: 'The First Auction!',
      description: 'This is the first auction!',
      quantity: 25,
      endDate: Date.now(),
      user: user1._id
    });

    return request(app)
      .post('/api/v1/bids/')
      .send({
        accepted: false,
        quantity: 30,
        price: 50,
        user: user2._id,
        auction: auction1._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          accepted: false,
          quantity: expect.any(Number),
          price: expect.any(Number),
          user: user2._id.toString(),
          auction: auction1._id.toString(),
          __v: 0
        });
      });
  });

  it('gets a bid by id', async() => {
    const user1 = await User.create({
      email: 'jj@gmail.com',
      password: 'jjissupercool'
    });

    const user2 = await User.create({
      email: 'jj@gmail.com',
      password: 'jjissupercool'
    });

    const auction1 =  await Auction.create({
      title: 'The First Auction!',
      description: 'This is the first auction!',
      quantity: 25,
      endDate: Date.now(),
      user: user1._id
    });

    const bid1 = await Bid.create({
      accepted: false,
      quantity: 30,
      price: 50,
      user: user2._id,
      auction: auction1._id
    });

    return request(app)
      .get(`/api/v1/bids/${bid1._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          quantity: expect.any(Number),
          price: expect.any(Number),
          user: {
            _id: expect.anything(),
            email: 'jj@gmail.com'
          },
          auction: {
            _id: expect.anything(),
            bids: [],
            title: expect.any(String),
            description: expect.any(String),
            quantity: expect.any(Number),
            endDate: expect.any(String),
            user: user1._id.toString(),
            __v: 0
          }
        });
      });
  });
});

// accepted: {
//   type: Boolean,
//   required: true
// },
// quantity: {
//   type: Number,
//   required: true
// },
// price: {
//   type: Number,
//   required: true
// },
// user: {
//   type: Schema.Types.ObjectId,
//   ref: 'User'
// },
// auction: {
//   type: Schema.Types.ObjectId,
//   ref: 'User'
// }
// });

// bidSchema.virtual('auctions', {
// ref: 'Auction',
// localField: '_id',
// foreignField: 'bids'
// });

// bidSchema.virtual('users', {
// ref: 'User',
// localField: '_id',
// foreignField: 'bids'
// });
