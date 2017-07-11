const gulp = require('gulp');
const gutil = require('gulp-util');

const environmentUtils = require('../../environment-utils');
const {cleanSrc} = require('../configs/clean');
const {typescript} = require('../configs/typescript');
const {e2e: cE2e, webdriverUpdate} = require('../configs/e2e');

/**
 * Runs e2e with protractor.
 * Before Running tests webdrive is updated
 *
 * Additionally if the BUILD_ENV is set to build typescript task will be run
 */
module.exports.e2e = function e2e(doneTask) {
  let task = null;
  if (environmentUtils.isBuild()) {
    task = gulp.series(cleanSrc, gulp.parallel(webdriverUpdate, typescript), cE2e, e2eDoneCallback);
  } else {
    task = gulp.series(webdriverUpdate, cE2e, e2eDoneCallback);
  }

  task();

  function e2eDoneCallback(done) {
    gutil.log('e2e task was executed successfully');
    done();
    doneTask();
  }
};
