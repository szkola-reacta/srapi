const Joi = require('joi');

const schemas = {
  create: Joi.object().keys({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
  }),
  update: Joi.object().keys({
    title: Joi.string().min(3),
    description: Joi.string().min(10),
  }),
};

module.exports = schemas;
