const gulp = require('gulp');
const gRemapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const environmentUtils = require('../../environment-utils');

exports.remapIstanbul = function remapIstanbul() {
    const karmaEnvironment = environmentUtils.getKarma();
    const coverage = karmaEnvironment.coverage;
    const reporters = coverage.remap.reporters;
    const karma = coverage.json;
    const pathToJson = karma.dir + karma.file;

    return gulp.src(pathToJson)
        .pipe(gRemapIstanbul({
            reports: reporters
        }));
};
