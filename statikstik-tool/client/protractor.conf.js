const environmentUtils = require('./config/environment-utils');
const protractorEnvironment = environmentUtils.getProtractor();
const output = protractorEnvironment.output;

let baseUrl = null;
let mochaOpts = {
  timeout: 60000,
  retries: 5,
};

let chromeOptions = {
  args: ['disable-extensions'],
};
let specs = protractorEnvironment.src;

if (process.env.NODE_ENV === 'testing') {
  specs = './testing/e2e/**/*.spec.js';
}

/**
 * Enables Batarang for protractor.
 */
if (process.env.BATARANG === 'true') {
  // Configuration to enable Angular Batarang Plugin in browser during debug. Plugin from
  // AppData\Local\Google\Chrome\User Data\Default\Extensions should be copied into C:/Temp
  chromeOptions = {
    args: ['--load-extension=C:/Temp/ighdmehidhipcmcojjgiloacoafjmpfk/0.10.7_0'],
  };
}

// Configures protractor to create jenkins friendly reports
if (environmentUtils.isBuild()) {
  baseUrl = protractorEnvironment.baseUrl.build;
  mochaOpts.reporter = 'mocha-junit-reporter';
  mochaOpts.reporterOptions = {
    mochaFile          : `${output}/e2e.xml`,
    useFullSuiteTitle  : true,
    suiteTitleSeparedBy: ' ',
  };
} else {
  // Configures protractor to create user friendly reports
  mochaOpts.reporter = 'spec';
  baseUrl = protractorEnvironment.baseUrl.ide;
}

const protractorConfig = {
  baseUrl,
  allScriptsTimeout: 10000,
  getPageTimeout   : 10000,
  specs            : [
    specs
  ],
  capabilities     : {
    chromeOptions,
    browserName   : 'chrome',
    maxInstances  : 1,
    shardTestFiles: true,
  },
  directConnect    : true,

  // Important settings for angular 2
  // based on this setting protractor waits till angular 2 had done initialization
  useAllAngular2AppRoots: true,
  rootElement           : protractorEnvironment.rootElement,
  // Important settings for angular 2

  framework: 'mocha',
  mochaOpts,

  onPrepare: function () {
    browser.ignoreSynchronization = false;
    if (environmentUtils.isIde()) {
      //browser.driver.manage().window().setPosition(-2000, 0);
    }

    /**
     * Initializes sinon and chai and respective plugins for protractor tests
     */
    const chai = require('chai');
    const sinon = require('sinon');

    require('sinon-stub-promise')(sinon);

    const chaiAsPromised = require('chai-as-promised');
    const sinonChai = require('sinon-chai');

    chai.use(sinonChai);
    chai.use(chaiAsPromised);

    chai.should();
  },

};

exports.config = protractorConfig;
