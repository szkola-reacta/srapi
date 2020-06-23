const express = require('express');

const validate = require('../validate');
const protect = require('../protect');
const controller = require('./controller');
const validators = require('./schemas');

const Router = express.Router;
const routes = new Router();

routes.post(
  '/login',
  validate(validators.login),
  controller.login,
);

routes.post(
  '/logout',
  validate(validators.logout),
  controller.logout,
);

routes.post(
  '/validate-token',
  validate(validators.validateToken),
  controller.validateToken,
);

routes.post(
  '/protected',
  protect,
  controller.protected,
);

module.exports = routes;