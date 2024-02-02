/* eslint-disable no-undef */
// Prettier doesnt recognize jest
const { createToken } = require('../app/token/services');
const { authenticate } = require('../app/middleware/auth');

let accessToken;
const tokenMessage = 'testing';
// Tests Endpoints
describe('GET /api/v1/token', () => {
  it('should get an access token', async () => {
    accessToken = createToken({ message: tokenMessage });
    expect(accessToken).toBeDefined();
  });
});

describe('POST /api/v1/token/validate', () => {
  it('should decode access token', async () => {
    const req = { cookies: { jwt: accessToken } };
    const res = {};
    const next = () => {};
    authenticate(req, res, next);

    expect(req.token).toBeDefined();
    expect(req.token.message).toBe(tokenMessage);
  });
});
