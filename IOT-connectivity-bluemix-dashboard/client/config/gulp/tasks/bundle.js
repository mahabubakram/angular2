const gulp = require('gulp');
const gutil = require('gulp-util');
const {webpackProduction} = require('../configs/webpack');

module.exports.bundle = function bundle(additionalBundleTasks = []) {
  let tasks = [webpackProduction];

  if (additionalBundleTasks.length > 0) {
    tasks = [...tasks, ...additionalBundleTasks];
  }

  return gulp.series(tasks, function bundleDoneCallback(done) {
    gutil.log('Bundle task was executed successfully');
    done();
  });
};
