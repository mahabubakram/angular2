const environmentUtils = require('./config/environment-utils');
const environment = environmentUtils.getEnvironment();
const karmaEnvironment = environmentUtils.getKarma();
const patterns = environmentUtils.getPatterns();
const junit = karmaEnvironment.junit;
const json = karmaEnvironment.coverage.json;
const coverageDir = json.dir;
const coverageFile = json.file;
const karmaBase = karmaEnvironment.karmaBase;
const src = environment.src;
const testing = environment.testing;
const nodeModules = environment.nodeModules;

const jsPattern = patterns.js;
const mapPattern = patterns.map;
const cssPattern = patterns.css;
const tsPattern = patterns.ts;
const htmlPattern = patterns.html;
const jsonPattern = patterns.json;

module.exports = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '../',

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['mocha'],


  // list of files to exclude
  exclude: karmaEnvironment.exclude,

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    [src + '**/!(*.spec|systemjs.config).js']: ['coverage'],
  },
  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters    : ['progress', 'coverage', 'junit'],


  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome'],

  // maps calls from app like /src/app/app.js to /base/src/app.js
  // It is needed because karma provides all resources under /base/**/*.*
  proxies: {
    '/node_modules/': `${karmaBase}${nodeModules}`,
    '/src/'         : `${karmaBase}${src}`,
    '/testing/'     : `${karmaBase}${testing}`,
  },

  junitReporter: {
    outputDir : junit.dir,
    outputFile: junit.file,
  },

  coverageReporter: {
    type             : 'json',
    dir              : coverageDir,
    subdir           : '.',
    file             : coverageFile,
    // Because of includeAllSource = true the coverage reporter generates a report including all files
    includeAllSources: true,
  },

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: true,

  // Concurrency level
  // how many browser should be started simultaneous
  concurrency: Infinity,

  /**
   * To avoid disconnection during the tests
   */
  browserDisconnectTimeout  : 1000000,
  browserDisconnectTolerance: 0,
  browserNoActivityTimeout  : 1000000,

  files: [
    nodeModules + 'systemjs/dist/system.js',

    {pattern: nodeModules + 'core-js/' + jsPattern, included: false, watched: false},
    {pattern: nodeModules + 'core-js/' + mapPattern, included: false, watched: false},
    {pattern: nodeModules + 'zone.js/' + jsPattern, included: false, watched: false},
    {pattern: nodeModules + 'zone.js/' + mapPattern, included: false, watched: false},

    {pattern: nodeModules + '/chai/chai.js', included: false, watched: false},
    {pattern: nodeModules + 'sinon/pkg/sinon.js', included: false, watched: false},
    {pattern: nodeModules + 'chai-as-promised/lib/chai-as-promised.js', included: false, watched: false},
    {pattern: nodeModules + 'check-error/index.js', included: false, watched: false},
    {pattern: nodeModules + 'assertion-error/index.js', included: false, watched: false},
    {pattern: nodeModules + 'sinon-chai/lib/sinon-chai.js', included: false, watched: false},
    {pattern: nodeModules + 'sinon-stub-promise/index.js', included: false, watched: false},

    {pattern: src + jsPattern, included: false, watched: true},
    {pattern: src + jsonPattern, included: false, watched: true},

    {pattern: src + htmlPattern, included: false, watched: true},
    {pattern: src + cssPattern, included: false, watched: true},

    {pattern: src + tsPattern, included: false, watched: false},
    {pattern: src + mapPattern, included: false, watched: false},

    {pattern: testing + jsPattern, included: false, watched: true},
    {pattern: testing + jsonPattern, included: false, watched: true},

    {pattern: testing + tsPattern, included: false, watched: false},
    {pattern: testing + mapPattern, included: false, watched: false},

    {pattern: src + 'app/systemjs.config.js', included: false, watched: false},
    './client/karma-test-shim.js',
  ],
};
