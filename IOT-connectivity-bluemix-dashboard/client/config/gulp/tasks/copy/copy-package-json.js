const {'basic-copy': basicCopy} = require('./basic-copy');
const environmentUtils = require('../../../environment-utils');

module.exports['copy-package-json'] = function () {
  const environment = environmentUtils.getEnvironment();
  const dist = environment.dist;

  const copyPackageJson = basicCopy('./package.json', './dist');
  Object.defineProperty(copyPackageJson, 'name', {
    value: 'copyPackageJson'
  });

  return copyPackageJson;
};
