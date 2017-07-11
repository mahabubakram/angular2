const gulp = require('gulp');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');

const {runNodeServer} = require('./run-node-server');
const environmentUtils = require('../../environment-utils');


const environment = environmentUtils.getEnvironment();
const patterns = environmentUtils.getPatterns();
const src = environment.src;
const styles = environment.styles;
const tsPattern = patterns.ts;
const cssPattern = patterns.css;
const htmlPattern = patterns.html;

module.exports.watch = function watch() {
  runNodeServer();
  livereload.listen();
  gulp.watch([src + tsPattern])
    .on('change', function (e) {
      gutil.log(`TypeScript file ${e} has been changed.`);
      livereload.changed(e);
    });

  gulp.watch([src + htmlPattern, src + cssPattern, styles + cssPattern])
    .on('change', function (e) {
      gutil.log(`Resource file ${e} has been changed. Updating.`);
      livereload.changed(e);
    });
};
