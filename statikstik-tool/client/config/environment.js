const env = process.env.BUILD_ENV ?
  process.env.BUILD_ENV :
  'ide';

const projectEnvironment = require('./project-environment');


const appName = projectEnvironment.appName;
const nodeModules = 'node_modules/';
const src = './client/src/';
const dist = './dist/client/';
const pathTesting = './client/testing/';
const output = './output/client/';
const tmp = '.tmp/client/';
const coverageOutput = `${output}coverage/`;
const webpackSrc = `./${src}`;
const webpackTmp = `./${tmp}`;
const pathJunit = 'junit/';

const specPattern = '**/*.spec.js';

module.exports = {
  appName    : appName,
  // type of build environment
  type       : env,
  nodeModules: nodeModules,
  dist       : dist,
  src        : src,
  tmp        : tmp,
  styles     : 'styles/',
  output     : output,
  testing    : pathTesting,
  patterns   : {
    ts  : '**/*.ts',
    js  : '**/*.js',
    map : '**/*.js.map',
    html: '**/*.html',
    css : '**/*.css',
    less: '**/*.less',
    spec: specPattern,
    json: '**/*.json',
  },
  gulp       : {
    tsconfig: './client/tsconfig.json',
  },
  karma      : {
    // karma uses to prefix all urls. But the page when testing does not do it, so it is needed for proxy config of
    // karma
    karmaBase: '/base/',
    // Karma should ignore these files
    exclude  : [`${pathTesting}e2e/**/*`, `${nodeModules}${specPattern}`],
    coverage : {
      // maps transpiled javascript coverage to typescript based and creates different reports based on environment
      remap: {
        reporters: {
          [isBuild() ? 'cobertura' : 'html']: `${coverageOutput}coverage.${isBuild() ? 'xml' : 'html'}`,
        },
      },
      // Karma produces coverage for transpiled javascript files as json so that remap plugin can map them to typescript
      json : {
        dir : coverageOutput,
        file: 'coverage.json',
      },
    },
    junit    : {
      dir : output + pathJunit,
      file: 'karma.xml',
    },
  },
  webpack    : {
    vendor : `${webpackSrc}app/vendor.ts`,
    main   : `${webpackSrc}main.ts`,
    shims  : `${webpackSrc}app/polyfills.ts`,
    // Webpack should ignore these files
    exclude: ['./node_modules/', './client/src/**/*.spec.ts'],
    index  : projectEnvironment.webpack.index,
    aot    : {
      // Entry Module of angular 2 app
      entryModule: `${src}${projectEnvironment.webpack.entryModule}`,
    },
  },
  protractor : {
    src        : `${pathTesting}e2e/${specPattern}`,
    output     : `${output}${pathJunit}e2e/`,
    baseUrl    : {
      ide  : projectEnvironment.protractor.ide,
      build: projectEnvironment.protractor.build,
    },
    // Based on the root element of angular 2 app protractor waits till the app had been initialized
    rootElement: projectEnvironment.angularAppRootElement,
  },
};

function isBuild() {
  return env === 'build';
}
