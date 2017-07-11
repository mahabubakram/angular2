(function (global) {

  var paths = {
    'npm:': '../../../node_modules/',
  };

  var map = {
    'src'          : 'src',
    'app'          : 'src/app',
    '@angular'     : 'npm:@angular',
    'rxjs'         : 'npm:rxjs',
    'ngx-bootstrap': 'npm:ngx-bootstrap',
    'ng2-select'   : 'npm:ng2-select',
    'lodash'       : 'npm:lodash',
    'zone.js'      : 'npm:zone.js',
    'core-js'      : 'npm:core-js',
    'moment'       : 'npm:moment',
    'mydatepicker' : 'npm:mydatepicker',
    'ramda'        : 'npm:ramda/dist',
  };

  var packages = {
    'lodash'       : {main: 'lodash.js', defaultExtension: 'js'},
    'ramda'        : {main: 'ramda.js', defaultExtension: 'js'},
    'moment'       : {main: 'moment.js', defaultExtension: 'js'},
    'ngx-bootstrap': {main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js'},
    'ng2-select'   : {main: 'bundles/ng2-select.umd.js', defaultExtension: 'js'},
    'mydatepicker' : {main: 'bundles/mydatepicker.umd.js', defaultExtension: 'js'},
    'src'          : {defaultExtension: 'js'},
    'app'          : {defaultExtension: 'js'},
    'rxjs'         : {defaultExtension: 'js'},
    'core-js'      : {defaultExtension: 'js'},
    'zone.js'      : {defaultExtension: 'js'},
  };

  var meta = {};

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
  ];

  var ngrxPackageNames = [];

  function packIndex(baseName) {
    return function (pkgName) {
      packages[baseName + pkgName] = {main: 'index.js', defaultExtension: 'js'};
    };
  }


  function packUmd(baseName) {
    return function (pkgName) {
      packages[baseName + pkgName] = {main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
    };
  }


  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  ngPackageNames.forEach(setPackageConfig('@angular/'));
  ngrxPackageNames.forEach(setPackageConfig('@ngrx/'));

  var config = {
    baseURL   : global.systemJsBaseUrl,
    paths     : paths,
    map       : map,
    packages  : packages,
    meta      : meta,
    transpiler: false,
  };
  SystemJS.config(config);
}(this));
