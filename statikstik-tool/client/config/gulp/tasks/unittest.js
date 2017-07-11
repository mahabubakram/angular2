const gulp = require('gulp');
const gutil = require('gulp-util');
const {cleanSrc} = require('../configs/clean');
const {unittest: unittestC} = require('../configs/unittest');
const {typescript} = require('../configs/typescript');
const {remapIstanbul} = require('../configs/remap-istanbul');
const environmentUtils = require('../../environment-utils');

/**
 * Runs unit test with karma.
 * Because karma generates code coverage for transpiled javascript files the task remapIstanbul is run to remap it to typescript.
 *
 * Additionally if the BUILD_ENV is set to build typescript task will be run
 */
module.exports.unittest = function unittest(doneTask) {
  let task = null;
  if (environmentUtils.isBuild()) {
    task = gulp.series(cleanSrc, typescript, unittestC, remapIstanbul, unittestDoneCallback);
  } else {
    task = gulp.series(unittestC, remapIstanbul, unittestDoneCallback);
  }

  task();

  function unittestDoneCallback(done) {
    gutil.log('unittest task was executed successfully');
    done();
    doneTask();
  }
};
