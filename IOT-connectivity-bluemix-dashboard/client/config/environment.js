const projectEnvironment = require('./project-environment');
const env = process.env.BUILD_ENV ?
  process.env.BUILD_ENV :
  'ide';
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
const specPattern = '**/*.spec.js';
const pathJunit = 'junit/';

module.exports = {
  appName    : appName,
  type       : env,
  nodeModules: nodeModules,
  dist       : dist,
  src        : src,
  tmp        : tmp,
  styles     : 'styles/',
  output     : output,
  gulp       : {
    tsconfig            : './client/tsconfig.json',
    revOutput           : `${output}rev/`,
    indexHtmlFromWebpack: `${projectEnvironment.webpack.index}.html`,
  },
  patterns   : {
    ts  : '**/*.ts',
    js  : '**/*.js',
    map : '**/*.js.map',
    html: '**/*.html',
    css : '**/*.css',
    less: '**/*.less',
    spec: specPattern,
    json: '**/*.json'
  },
  karma      : {
    karmaBase: '/base/',
    exclude  : [`${pathTesting}e2e/**/*`, nodeModules + specPattern],
    coverage : {
      remap: {
        reporters: {
          [isBuild() ? 'cobertura' : 'html']: `${coverageOutput}coverage.${isBuild() ? 'xml' : 'html'}`
        }
      },
      json : {
        dir : coverageOutput,
        file: 'coverage.json'
      }
    },
    junit    : {
      dir : output + pathJunit,
      file: 'karma.xml'
    }
  },
  webpack    : {
    vendor : `${webpackSrc}app/vendor.ts`,
    main   : `${webpackSrc}main.ts`,
    shims  : `${webpackSrc}app/polyfills.ts`,
    exclude: ['./node_modules/', './client/src/**/*.spec.ts'],
    index  : projectEnvironment.webpack.index,
    aot    : {
      entryModule: src + projectEnvironment.webpack.entryModule
    },
  },
  protractor : {
    src        : `${pathTesting}e2e/${specPattern}`,
    output     : `${output}${pathJunit}e2e/`,
    baseUrl    : {
      ide  : projectEnvironment.protractor.ide,
      build: projectEnvironment.protractor.build
    },
    rootElement: projectEnvironment.angularAppRootElement
  }
};

function isIde() {
  return env === 'ide';
}

function isBuild() {
  return env === 'build';
}
