const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const gulp = require('gulp');
const environmentUtils = require('../../environment-utils');
const environment = environmentUtils.getEnvironment();
const gulpEnvironment = environmentUtils.getGulp();
const patterns = environmentUtils.getPatterns();

const tsconfig = gulpEnvironment.tsconfig;
const tsProject = ts.createProject(tsconfig);

/**
 * Transpiles all typescript from src directory defined by the environment
 */
exports.typescript = function typescript() {
    const src = environment.src;
    const tsPattern = patterns.ts;

    return gulp.src(src + tsPattern)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(src))
};
