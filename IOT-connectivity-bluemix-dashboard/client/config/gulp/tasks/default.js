const gulp = require('gulp');
const gutil = require('gulp-util');
const {cleanOutput, cleanDist, cleanSrc} = require('../configs/clean');
const {e2e} = require('./e2e');
const {bundle} = require('./bundle-project-specific');
const {unittest} = require('./unittest');
const {copy} = require('./copy-project-specific');

module.exports.defaultTask = gulp.series(gulp.parallel(cleanOutput, cleanDist, cleanSrc), unittest, cleanSrc, e2e, gulp.parallel(bundle, copy), function defaultDoneCallback(done) {
  gutil.log('Default task was executed successfully');
  done();
});
