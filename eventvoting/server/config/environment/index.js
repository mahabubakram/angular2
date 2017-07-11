'use strict';

var path = require('path');
var _ = require('lodash');

/**
 * @enum
 * @readonly
 */
const envTypes = {
  dev : 'development',
  test: 'test',
  prod: 'production',
  demo: 'demo',
};


function getEnvByName(envName) {
  return _.find(envTypes, function matchValue(envValue) {
    return envValue === envName.toLowerCase();
  });
}

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  envTypes: envTypes,

  getEnvByName: getEnvByName,

  env: getEnvByName(process.env.NODE_ENV),

  //env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  httpsPort: 443,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'eventvoting-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
