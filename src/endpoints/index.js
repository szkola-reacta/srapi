const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../doc/swagger.json');

const API_VERSION = 'v1';

const moviesRoutes = require('./movies/routes');
const eventsRoutes = require('./events/routes');
const placesRoutes = require('./places/routes');

module.exports = app => {
  app.use(`/${API_VERSION}/movies`, moviesRoutes);
  app.use(`/${API_VERSION}/events`, eventsRoutes);
  app.use(`/${API_VERSION}/places`, placesRoutes);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};