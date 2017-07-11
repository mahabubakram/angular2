const baseConfig = require('./karma.core.conf.js');
const environmentUtils = require('./config/environment-utils');
const environment = environmentUtils.getEnvironment();
const patterns = environmentUtils.getPatterns();
const nodeModules = environment.nodeModules;
const jsPattern = patterns.js;
const mapPattern = patterns.map;

// list of files / patterns to load in the browser
const projectLibs = [

  {pattern: nodeModules + 'rxjs/' + jsPattern, included: false, watched: false},
  {pattern: nodeModules + 'rxjs/' + mapPattern, included: false, watched: false},

  {pattern: nodeModules + '@angular/' + jsPattern, included: false, watched: false},
  {pattern: nodeModules + '@angular/' + mapPattern, included: false, watched: false},

  {pattern: nodeModules + '@ngrx/' + jsPattern, included: false, watched: false},
  {pattern: nodeModules + '@ngrx/' + mapPattern, included: false, watched: false},

  {pattern: nodeModules + 'lodash/' + jsPattern, included: false, watched: false},
];

baseConfig.files = [...baseConfig.files, ...projectLibs];

module.exports = function (config) {

  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
  // config.LOG_DEBUG
  baseConfig.logLevel = config.LOG_INFO;

  config.set(baseConfig)
};
