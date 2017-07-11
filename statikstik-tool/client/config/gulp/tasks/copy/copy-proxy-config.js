const {'basic-copy': basicCopy} = require('./basic-copy');
const environmentUtils = require('../../../environment-utils');
const {nameGulpTask} = require('../../../helpers');

const environment = environmentUtils.getEnvironment();
const dist = environment.dist;

/**
 * Gulp copy task for copying server-build-config.js for client-server-proxy from ./client directory to ./dist/server directory
 */
const copyProxyConfig = basicCopy('./client/server-build-config.js', './dist/server');

nameGulpTask(copyProxyConfig, 'copyProxyConfig');

module.exports['copy-proxy-config'] = copyProxyConfig;