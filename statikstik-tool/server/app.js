const proxyServerConfig = require('../client/server-config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
proxyServerConfig.dirs.forEach(function ({url, dir}) {
  app.use(url, express.static(path.resolve(dir)));
  console.log(`Folgendes Verzeichnis: ${dir} ist unter ${url} erreichbar`);
});
app.get(proxyServerConfig.index.url, (req, res) => res.sendFile(path.resolve(proxyServerConfig.index.dir, proxyServerConfig.index.file + '.html')));

app.listen(port);
