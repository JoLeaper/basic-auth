const { usernamePasswordReader } = require('./ensureAuth');

// username:password

// postgres://myUsername:password@HOST:5432/db_name
//postgres://fxrtybdrskoyqu:b77425e111726b4134913d6bff97a6f5b88e97e73bdbe52cb9d2e7d10e670e23@ec2-3-231-16-122.compute-1.amazonaws.com:5432/dac97o2f57eqg2
describe('ensureAuth middleware', () => {
  // 1. read the header -> return obj with username/password
  // 2. check the password in middleware

  it('can read a username/password from the header', () => {
    const authorization = 'Basic cnlhbjpwYXNzd29yZA==';
    expect(usernamePasswordReader(authorization)).toEqual({
      username: 'ryan',
      password: 'password'
    });
  });
});
