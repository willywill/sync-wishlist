/* eslint-disable-next-line */
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
  ignore: ['node_modules', '.next'],
});

// Import the rest of our application.
module.exports = require('./app.js');
