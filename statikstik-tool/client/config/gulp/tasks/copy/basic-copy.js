const gulp = require('gulp');
const gutil = require('gulp-util');

/**
 * Basic task for copying files from src to dest
 * @param {String} src directory of file to copy
 * @param {String} dest for copied files and / or directories
 * @returns {Function} Configured gulp task for copying files and directories for src to dest
 */
module.exports['basic-copy'] = function basicCopy(src, dest) {
  return () => gulp
    .src(src)
    .pipe(gulp.dest(dest))
    .on('end', function copySuccessful() {
      gutil.log(`Copied files and directories from ${src} to ${dest}`);
    });
};
