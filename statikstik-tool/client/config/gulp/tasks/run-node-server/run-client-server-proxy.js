const serverConfig = require('../../../../server-config.js');
const clientServerProxy = require('@ars/client-server-proxy');

/**
 * Gulp task for running client-server-proxy
 */
module.exports.runClientServerProxy = function runClientServerProxy() {
    clientServerProxy(serverConfig)
};
