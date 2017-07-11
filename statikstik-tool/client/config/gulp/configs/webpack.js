const gulp = require('gulp');
const gutil = require('gulp-util');
const webpackStream = require('webpack-stream');
const path = require('path');
const webpack = require('webpack');
const environmentUtils = require('../../environment-utils');
const {nameGulpTask} = require('../../helpers');

const environment = environmentUtils.getEnvironment();
const webpackEnvironment = environmentUtils.getWebpack();

/**
 * Basic webpack tasks with runs webpack for given configuration.
 * @param {String[]} entryFiles defined by webpack environment
 * @param {String} output for bundles defined by environment
 * @param {String} webpackConfigName with should be used to run webpack
 * @returns {Function} Configured webpack gulp task
 */
function webpackTask(entryFiles, output, webpackConfigName) {
  return () => {
    const webpackConfig = require(path.join(__dirname, '../../webpack/' + webpackConfigName));
    return gulp
      .src(entryFiles)
      .pipe(webpackStream(webpackConfig, webpack))
      .on('error', (err) => {
        gutil.log('WEBPACK ERROR', err);
      })
      .pipe(gulp.dest(output));
  };
}

/**
 * Webpack gulp task for running webpack.prod.js
 */
const webpackProduction = webpackTask([webpackEnvironment.main, webpackEnvironment.vendor, webpackEnvironment.shims], environment.dist, 'webpack.prod.js');

nameGulpTask(webpackProduction, 'webpackProduction');

exports.webpackProduction = webpackProduction;

