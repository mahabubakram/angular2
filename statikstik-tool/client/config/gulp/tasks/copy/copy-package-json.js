const {'basic-copy': basicCopy} = require('./basic-copy');
const {nameGulpTask} = require('../../../helpers');

/**
 * Gulp copy task for copying package.json from root directory of project to dist
 */
const copyPackageJson = basicCopy('./package.json', './dist');

nameGulpTask(copyPackageJson, 'copyPackageJson');

module.exports['copy-package-json'] = copyPackageJson;
