const karma = __karma__;

// baseUrl of system js must be extended to support base of karma
window.systemJsBaseUrl = '/base/client';

const specFiles = Object.keys(karma.files).filter(isSpecFile);

// karma.loaded must be redefined because karma needs to wait till dependencies served by systemjs are resolved and
// init code has been run
karma.loaded = function () {
};

const karmaSystemJsConf = {
  baseURL : '/base/client',
  map     : {
    '@angular/core/testing'            : 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing'          : 'npm:@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing'        : 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing'                    : 'npm:@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing'                  : 'npm:@angular/router/bundles/router-testing.umd.js',
    '@angular/forms/testing'                   : 'npm:@angular/forms/bundles/forms-testing.umd.js',
    'chai-as-promised'                 : 'npm:chai-as-promised/lib/chai-as-promised.js',
    'chai'                             : 'npm:chai/chai.js',
    'sinon'                            : 'npm:sinon/pkg/sinon.js',
    'sinon-chai'                       : 'npm:sinon-chai/lib/sinon-chai.js',
    'sinon-stub-promise'               : 'npm:sinon-stub-promise/index.js',
    'check-error'                      : 'npm:check-error/index.js',
    'assertion-error'                  : 'npm:assertion-error/index.js',
    'testing'                          : 'testing',
  },
  packages: {
    'testing': {defaultExtension: 'js'},
  },
};

System.config(karmaSystemJsConf);

System.import('src/app/systemjs.config.js')
  .then(() => System.import('src/app/polyfills.js'))
  .then(initTestBedPolfyfills)
  .then(initFrameworks)
  .then(initTestBed)
  .then(initTests)
  .then(karma.start, karma.error);

/**
 * Initializes the testbed of angular 2
 */
function initTestBed() {
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing'),
  ])

    .then(function ([coreTesting, browserTesting]) {
      coreTesting.TestBed.initTestEnvironment(
        browserTesting.BrowserDynamicTestingModule,
        browserTesting.platformBrowserDynamicTesting());
    });
}

/**
 * Initializes test files
 */
function initTests() {
  return Promise.all(
    specFiles.map(function (moduleName) {
      return System.import(moduleName);
    }),
  );
}

/**
 * Initializes test frameworks like chai and sinon and respective plugins.
 */
function initFrameworks() {
  return Promise.all([
    System.import('chai'),
    System.import('sinon'),
    System.import('sinon-stub-promise'),
    System.import('sinon-chai'),
    System.import('chai-as-promised'),
  ]).then(function ([chai, sinon, sinonStubPromise, sinonChai, chaiAsPromised]) {

    sinonStubPromise(sinon);

    chai.use(sinonChai);
    chai.use(chaiAsPromised);

    chai.should();
  });
}

/**
 * Initializes needed polyfills for angular 2 and angular 2 testbed.
 */
function initTestBedPolfyfills() {
  return Promise.all([
    System.import('zone.js/dist/long-stack-trace-zone'),
    System.import('zone.js/dist/async-test'),
    System.import('zone.js/dist/sync-test'),
    System.import('zone.js/dist/proxy'),
    System.import('zone.js/dist/mocha-patch'),
  ]);
}

function isSpecFile(filePath) {
  return /\.spec\.(.*\.)?js$/.test(filePath);
}
