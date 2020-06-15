const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');

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

  it('gets the details of a bottle by populating product information', async() => {
    return request(app)
      .post('/api/v1/users/')
      .send({
        email: 'jj@gmail.com',
        password: 'jjissupercool'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          email: 'jj@gmail.com'
        });
      });
  });
});
