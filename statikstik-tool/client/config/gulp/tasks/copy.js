const gulp = require('gulp');
const gutil = require('gulp-util');
const {'copy-package-json': copyPackageJson} = require('./copy/copy-package-json');

/**
 * Basic aggregator tasks for running steps with are needed for copying.
 * It runes in series the defined default tasks and given additional tasks.
 *
 * Default tasks: copyPackageJson
 * @param {Function[]} additionalTasks with are run after default tasks
 * @returns {*} Configured copy task
 */
module.exports.copy = function copy(additionalTasks = []) {

  let tasks = [copyPackageJson];

  if (additionalTasks.length > 0) {
    tasks = [...tasks, ...additionalTasks];
  }

  return gulp.series(tasks, function copyDoneCallback(done) {
    gutil.log('Copy task was executed successfully');
    done();
  });
};
