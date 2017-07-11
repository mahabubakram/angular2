module.exports = {
  authorization : {
    isNeeded: false
  },
  proxyOptions  : {
    source: '/api*',
    target: 'https://drv-mock-services.eu-de.mybluemix.net/',
    logLevel: 'debug'
  },
  dirs          : [{
    url: '/src',
    dir: 'client/src/'
  },{
    url: '/app',
    dir: 'client/src/app/'
  }, {
    url: '/assets/',
    dir: 'client/src/assets/'
  },{
    url: '/node_modules/',
    dir: 'node_modules/'
  }],
  index         : {
    url : ['/*', '/'],
    dir : 'client/src/app/',
    file: 'index'
  },
  templateEngine: 'handlebars',
};
