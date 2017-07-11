const gulp = require('gulp');
const gutil = require('gulp-util');
const {webpackProduction} = require('../configs/webpack');

/**
 * Basic aggregator tasks for running steps with are needed for bundling.
 * It runes in series the defined default tasks and given additional tasks.
 *
 * Default tasks: webpackProduction
 * @param {Function[]} additionalBundleTasks with are additionally running after defined default tasks
 * @returns {Function} Configured bundle tasks
 */
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
