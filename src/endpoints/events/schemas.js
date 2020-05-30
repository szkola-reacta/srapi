const Joi = require('joi');

const schemas = {
  create: Joi.object().keys({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    cover_url: Joi.string().uri(),
    price: Joi.number().required(),
    city: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    address: Joi.string(),
    date: Joi.date().required(),
    hour: Joi.number()
  }),
  update: Joi.object().keys({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    cover_url: Joi.string().uri(),
    price: Joi.number().required(),
    city: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    address: Joi.string(),
    date: Joi.date().required(),
    hour: Joi.number()
  }),
};

module.exports = schemas;
