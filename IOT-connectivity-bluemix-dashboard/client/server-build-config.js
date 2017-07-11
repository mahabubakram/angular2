module.exports = {
  authorization : {
    isNeeded: false
  },
  proxyOptions  : {
    source: '/api*',
    target: 'https://todoservices.mybluemix.net',
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
