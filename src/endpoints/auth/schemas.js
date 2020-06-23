const Joi = require('joi');

const schemas = {
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  logout: Joi.object().keys({
    token: Joi.string().required()
  })
};

module.exports = schemas;
