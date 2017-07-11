const del = require('del');
const environmentUtils = require('../../environment-utils');
const {nameGulpTask} = require('../../helpers');

const environment = environmentUtils.getEnvironment();
const dist = environment.dist;
const output = environment.output;
const src = environment.src;
const patterns = environmentUtils.getPatterns();
const jsPattern = patterns.js;
const map = patterns.map;

/**
 * Basic clean task for removing files from directories
 * @param {String[]} src
 * @returns {function(): *}
 */
function clean(...src) {
    return () => del(src, {force: true});

}

/**
 * Deletes current dist directory
 */
const cleanDist = clean(dist);

/**
 * Deletes current output directory
 */
const cleanOutput = clean(output);

/**
 * Removes all js and maps files from src directory
 */
const cleanSrc = clean(src + jsPattern, src + map, '!' + src + 'app/systemjs.config.js');

nameGulpTask(cleanDist, 'cleanDist');
nameGulpTask(cleanOutput, 'cleanOutput');
nameGulpTask(cleanSrc, 'cleanSrc');

exports.cleanDist = cleanDist;
exports.cleanOutput = cleanOutput;
exports.cleanSrc = cleanSrc;
