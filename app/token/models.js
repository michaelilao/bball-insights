const Joi = require('joi');

const token = Joi.object({
  token: Joi.string()
});

module.exports = { token };
