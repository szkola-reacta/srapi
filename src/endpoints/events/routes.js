const express = require('express');

const validate = require('../validate');
const controller = require('./controller');
const validators = require('./schemas');

const Router = express.Router;
const routes = new Router();

routes.get('/', controller.getList);

routes.post(
  '/',
  validate(validators.create),
  controller.create,
);

routes.get('/:id', controller.getById);

routes.patch(
  '/:id',
  validate(validators.update),
  controller.update,
);

routes.delete('/:id', controller.delete);

module.exports = routes;