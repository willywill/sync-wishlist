const config = require('../server/config');

module.exports = {
  publicRuntimeConfig: {
    apiUrl: config.apiUrl,
    baseUrl: config.baseUrl,
  },
};
