'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://eventUser:a1R1s1993@localhost/eventvoting-dev?authMechanism=MONGODB-CR&authSource=admin'
  },

  // Seed database on startup
  seedDB: true,

  logging: {
    colorize: true,
  },

};
