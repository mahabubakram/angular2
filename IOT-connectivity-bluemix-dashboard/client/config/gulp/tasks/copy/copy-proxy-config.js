const {'basic-copy': basicCopy} = require('./basic-copy');
const environmentUtils = require('../../../environment-utils');

module.exports['copy-proxy-config'] = function copyProxyConfig() {
  const environment = environmentUtils.getEnvironment();
  const dist = environment.dist;

  const copyProxyConfig = basicCopy('./client/server-build-config.js', './dist/server');
  Object.defineProperty(copyProxyConfig, 'name', {
    value: 'copyProxyConfig'
  });

  return copyProxyConfig;
};
