const gulp = require('gulp');
const gutil = require('gulp-util');

module.exports['basic-copy'] = function basicCopy(src, dest) {
  return () => gulp
    .src(src)
    .pipe(gulp.dest(dest))
    .on('end', function copySuccessful() {
      gutil.log(`Copied files and directories from ${src} to ${dest}`);
    });
};
