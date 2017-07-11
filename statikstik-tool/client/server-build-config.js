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
    url: '/',
    dir: './client/'
  }],
  index         : {
    url : ['/*', '/'],
    dir : './client/',
    file: 'index'
  },
  templateEngine: 'html',
};
