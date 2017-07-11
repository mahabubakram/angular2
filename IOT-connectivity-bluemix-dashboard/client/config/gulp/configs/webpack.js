const gulp = require('gulp');
const gutil = require('gulp-util');
const webpackStream = require('webpack-stream');
const path = require('path');
const webpack = require('webpack');
const environmentUtils = require('../../environment-utils');

const environment = environmentUtils.getEnvironment();
const webpackEnvironment = environmentUtils.getWebpack();

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

const webpackProduction = webpackTask([webpackEnvironment.main, webpackEnvironment.vendor], environment.dist, 'webpack.prod.js');

Object.defineProperty(webpackProduction, 'name', {
  value: 'webpackProduction'
});

exports.webpackProduction = webpackProduction;

