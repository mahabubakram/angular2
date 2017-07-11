const tslint = require('gulp-tslint');
const gulp = require('gulp');
const environmentUtils = require('../config/environment-utils');

/**
 * Gulp Task to lint all custom typescripts
 */
exports.tsLint = function tsLint() {
    const constant = environmentUtils.getEnvironment();
    const patterns = environmentUtils.getPatterns();
    const src = constant.src;
    const tsPattern = patterns.ts;

    return gulp.src(src + tsPattern)
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
};