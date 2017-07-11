function getEnvironment() {
  return require('./environment');
}

function getSubEnvironment(environmentName) {
  const objectToRead = getEnvironment();

  return objectToRead[environmentName];
}

function getGulp() {
  return getSubEnvironment('gulp');
}

function getPatterns() {
  return getSubEnvironment('patterns');
}

function getKarma() {
  return getSubEnvironment('karma');
}

function getWebpack() {
  return getSubEnvironment('webpack');
}

function getProtractor() {
  return getSubEnvironment('protractor');
}

function getServerConfig() {
  return getSubEnvironment('serverConfig');
}

function isBuild() {
  return getEnvironment().type === 'build';
}

function isIde() {
  return getEnvironment().type === 'ide';
}


module.exports = {
  getGulp,
  getPatterns,
  getEnvironment,
  getKarma,
  getWebpack,
  getProtractor,
  getServerConfig,
  isBuild,
  isIde
};
