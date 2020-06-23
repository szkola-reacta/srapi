const jwt = require('jsonwebtoken');
const HTTPStatus = require('http-status');

const constants = require('../config/constants');

const middleware = (req, res, next) => {
  const token = req.get(constants.TOKEN_HEADER);
  const secret = process.env.JWT_SECRET;
  try {
    jwt.verify(token, secret);
    next();
  } catch(err) {
    console.log('error', 'Invalid token');
    res.status(HTTPStatus.BAD_REQUEST).json({ error: 'Invalid token '});
  }
}

module.exports = middleware;