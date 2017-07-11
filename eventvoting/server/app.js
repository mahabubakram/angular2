/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
const config = require('./config/environment');
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {

  //init the secure files for https
  var fs = require('fs');
  var privateKeyLocalhost = fs.readFileSync('/home/vagrant/Desktop/sslcert/privkey.pem');
  var certificateLocalhost = fs.readFileSync('/home/vagrant/Desktop/sslcert/cert.pem');
  var ca = fs.readFileSync('/home/vagrant/Desktop/sslcert/chain.pem');
  var credentials = {key: privateKeyLocalhost, cert: certificateLocalhost, ca: ca};

  var httpsServer = require('https').createServer(credentials, app);
  // Start server
  httpsServer.listen(config.httpsPort, config.ip, function () {
    console.log('HTTPS Express server listening on %d, in %s mode', config.httpsPort, app.get('env'));
  });
  httpsServer.on('error', function (error) {
    console.log(error);
  });
  var httpServer = require('http').createServer(app);

  httpServer.on('error', function (error) {
    console.log(error);
  });
  httpServer.listen(config.port, config.ip, function () {
    console.log('HTTP Server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
