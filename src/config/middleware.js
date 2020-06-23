const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const constants = require('../config/constants');
const env = process.env.NODE_ENV;
const isDev = env === 'development';
// We shouldn't do it but it's for learning...
// ...I suppose
const isProd = env === 'production';

module.exports = app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (isDev || isProd) { // ;)
    const corsOptions = {
      origin: '*',
      exposeHeaders: [constants.TOKEN_HEADER]
    };
    app.use(cors(corsOptions));
  }
  if (isDev) {
    app.use(morgan('dev'));
  } else if (isProd) {
    app.use(morgan('tiny'));
  }
};
