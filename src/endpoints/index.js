const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../doc/swagger.json');

const API_VERSION = 'v1';

const moviesRoutes = require('./movies/routes');
// const eventsRoutes = require('./events/event.routes');
// const placesRoutes = require('./places/place.routes');

module.exports = app => {
  app.use(`/${API_VERSION}/movies`, moviesRoutes);
  // app.use('/api/v1/events', eventsRoutes);
  // app.use('/api/v1/places', placesRoutes);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};