'use strict';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'production' || env === 'development' || env === 'test') {
  // Register the Babel require hook
  console.log('using env' + env)
  require('babel-register');
}

// Export the application
exports = module.exports = require('./app');
