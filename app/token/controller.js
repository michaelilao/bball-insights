const { createToken } = require('./services');
const { tokenAge } = require('../config');

const validateToken = async (req, res) => {
  const { token } = req;
  return res.status(200).json({
    error: false,
    message: 'token is valid',
    status: 200,
    data: token,
  });
};

const getToken = async (req, res) => {
  const jwtData = { message: 'Successfully Created Token' };
  const token = createToken(jwtData);

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: tokenAge * 1000,
  });

  return res.status(200).json({
    error: false,
    message: 'token created succesfully',
    status: 200,
    data: token,
  });
};

module.exports = { validateToken, getToken };
