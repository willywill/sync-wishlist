const dotenv = require('dotenv');

dotenv.config();

const config = {
  test: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL || 'http://localhost:3001/api/graphql',
    db: {
      connectionString: process.env.DB_CONNECTION_STRING,
    },
    email: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
  },
  development: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL || 'http://localhost:3001/api/graphql',
    db: {
      connectionString: process.env.DB_CONNECTION_STRING,
    },
    email: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
  },
  production: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL || 'http://localhost:3001/api/graphql',
    db: {
      connectionString: process.env.DB_CONNECTION_STRING,
    },
    email: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
  },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
