module.exports = {
  appName              : 'angular2-todo',
  angularAppRootElement: 'app-root',
  gulp                 : {
    htmlName: 'index.hbs',
  },
  webpack              : {
    entryModule: 'app/app.module#AppModule',
    index      : 'index',
  },
  protractor           : {
    ide  : 'http://localhost:3000',
    build: 'http://localhost:3000'
  }
};
