const {copy} = require('./copy');
const {'copy-proxy-config': copyProxyConfig} = require('./copy/copy-proxy-config');

module.exports.copy = copy([copyProxyConfig()]);
