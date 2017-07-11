const gulp = require('gulp');
const gutil = require('gulp-util');
const {'copy-package-json': copyPackageJson} = require('./copy/copy-package-json');

module.exports.copy = function copy(additionalTasks = []) {

  let tasks = [copyPackageJson()];

  if (additionalTasks.length > 0) {
    tasks = [...tasks, ...additionalTasks];
  }

  return gulp.series(tasks, function copyDoneCallback(done) {
    gutil.log('Copy task was executed successfully');
    done();
  });
};
