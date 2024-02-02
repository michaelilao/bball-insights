const jwt = require('jsonwebtoken');
const { tokenAge } = require('../config');

const createToken = (data) => {
  const tokenKey = process.env.token_key;
  const token = jwt.sign(data, tokenKey, {
    expiresIn: tokenAge,
  });
  return token;
};

module.exports = { createToken };
