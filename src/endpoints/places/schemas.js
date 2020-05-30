const Joi = require('joi');

const schemas = {
  create: Joi.object().keys({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    foto_url: Joi.string().uri(),
    price: Joi.number().required(),
    city: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    address: Joi.string()
  }),
  update: Joi.object().keys({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    foto_url: Joi.string().uri(),
    price: Joi.number().required(),
    city: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    address: Joi.string()
  }),
};

module.exports = schemas;
