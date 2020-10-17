const dotenv = require('dotenv');

dotenv.config();

const config = {
  test: {
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL || 'http://localhost:3001/api/graphql',
    db: {
      connectionString: process.env.DB_CONNECTION_STRING,
    },
  },
  development: {
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL || 'http://localhost:3001/api/graphql',
    db: {
      connectionString: process.env.DB_CONNECTION_STRING,
    },
  },
  production: {
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL || 'http://localhost:3001/api/graphql',
    db: {
      connectionString: process.env.DB_CONNECTION_STRING,
    },
  },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
