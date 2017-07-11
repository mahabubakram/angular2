(function (global) {

  var paths = {
    'npm:': '../../../node_modules/'
  };

  var map = {
    'src'                       : 'src',
    'app'                       : 'src/app',
    '@angular'                  : 'npm:@angular',
    'rxjs'                      : 'npm:rxjs',
    'ng2-bootstrap'             : 'npm:ng2-bootstrap',
    '@ngrx'                     : 'npm:@ngrx',
    'lodash'                    : 'npm:lodash',
    'hammerjs'                  : 'npm:hammerjs',
    'zone.js'                   : 'npm:zone.js',
    'core-js'                   : 'npm:core-js',
    'moment'                    : 'npm:moment',
    'typescript'                : 'npm:typescript/lib/typescript.js',
    'angular2-highcharts'       : 'npm:angular2-highcharts',
    'highcharts'                : 'npm:highcharts',
    'ng2-charts'                : 'npm:ng2-charts'
  };

  var packages = {
    'hammerjs'                  : {main: 'hammer.min.js', defaultExtension: 'js'},
    'lodash'                    : {main: 'lodash.js', defaultExtension: 'js'},
    'moment'                    : {main: 'moment.js', defaultExtension: 'js'},
    'highcharts'                : {main: 'highcharts.js', defaultExtension: 'js'},
    'ng2-bootstrap'             : {format: 'cjs', main: 'bundles/ng2-bootstrap.umd.js', defaultExtension: 'js' },
    'angular2-highcharts'       : {main: './index.js', defaultExtension: 'js'},
    'src'                       : {defaultExtension: 'js'},
    'app'                       : {defaultExtension: 'js'},
    'rxjs'                      : {defaultExtension: 'js'},
    'core-js'                   : {defaultExtension: 'js'},
    'zone.js'                   : {defaultExtension: 'js'},
    'ng2-charts'                : { main: 'ng2-charts.js', defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ];

  var ngrxPackageNames = [
    'store',
    'core',
    'store-devtools'
  ];

  var ng2BootstrapComponents = [
    'alert'
  ];
  var meta = {};

  function packIndex(baseName) {
    return function (pkgName) {
      console.log(baseName)
      console.log(pkgName);
      packages[baseName + pkgName] = {main: 'index.js', defaultExtension: 'js'};
    }

  }


  function packUmd(baseName) {
    return function (pkgName) {
      console.log('Umd: '+ pkgName);
      packages[baseName + pkgName] = {main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
    };
  }


  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  ngPackageNames.forEach(setPackageConfig('@angular/'));
  //ng2BootstrapComponents.forEach(packIndex('ng2-bootstrap/'));
  ngrxPackageNames.forEach(setPackageConfig('@ngrx/'));

  var config = {
    baseURL   : global.systemJsBaseUrl,
    paths     : paths,
    map       : map,
    packages  : packages,
    meta      : meta,
    transpiler: false
  };
  SystemJS.config(config);
}(this));
