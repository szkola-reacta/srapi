// Validate middleware pod Express and Joi
const Joi = require('joi');
const HTTPStatus = require('http-status');

const middleware = (schema) => {
  return (req, res, next) => {
  const { error } = Joi.validate(req.body, schema);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');

    console.log('error', message);
    res.status(HTTPStatus.BAD_REQUEST).json({ error: message }) };
  }
}

module.exports = middleware;