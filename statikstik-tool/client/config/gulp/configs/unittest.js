const KarmaTestServer = require('karma').Server;
const path = require('path');

/**
 * Runs karma for configuration defined by karma.conf.js
 */
exports.unittest = function unittest(done) {
    /**
     * Runs unit tests and generates coverage reports into /logs.
     * See Karma-Config for details.
     */
    new KarmaTestServer({
        configFile: path.join(__dirname, '../../../karma.conf.js')
    }, function () {
        done();
    }).start();
};
