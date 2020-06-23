const express = require('express');

const validate = require('../validate');
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

module.exports = routes;