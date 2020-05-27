const devConfig = {
  API_URL: process.env.API_URL,
};
const testConfig = {
  API_URL: process.env.API_URL,
};
const prodConfig = {
  API_URL: process.env.API_URL,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

const envConfig = (env) => {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
};

module.exports = {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
