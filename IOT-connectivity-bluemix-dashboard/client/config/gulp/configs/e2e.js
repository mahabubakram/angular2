const gulp = require('gulp');
let gProtractor = require('gulp-protractor');
const protractor = gProtractor.protractor;
const environmentUtils = require('../../environment-utils');

exports.webdriverUpdate = gProtractor.webdriver_update;

exports.e2e = function e2e() {
  const protractorEnvironment = environmentUtils.getProtractor();

  return gulp.src([protractorEnvironment.src])
    .pipe(protractor({
      configFile: './client/protractor.conf.js'
    }));
};
