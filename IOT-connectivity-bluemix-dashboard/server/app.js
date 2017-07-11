const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const request = require("request");
const port = process.env.PORT || 8080;

let Cloudant = require('cloudant');
const cloudantUrl = 'https://68b2485c-f897-4c77-842d-85ae8a5c82dc-bluemix:13390b880684303d5d0c4e742b11f414cd0b1d6d922db67f1a4638bd60e541aa@68b2485c-f897-4c77-842d-85ae8a5c82dc-bluemix.cloudant.com';
let db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(path.resolve('./dist/client/')));
app.use('/node_modules/', express.static(path.resolve('./node_modules/')));
app.use('/api', router);
app.use('*', express.static(path.resolve('./dist/client/')));
app.get(['/'], (req, res) => res.sendFile(path.resolve('dist/client/', `index.html`)));

let cloudantResult;

Cloudant({url:cloudantUrl}, function(err, cloudant) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
  if(cloudant){
    cloudantResult = cloudant;
    console.log('Hi cloudant connection is set');
    db = cloudant.db.use('sensor-data');
  }

});


router.route('/cloud')
  .get(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    db = cloudantResult.db.use('sensor-data');
    var query = {selector: {"createdAt": {"$gt": 0}, "index": parseInt(req.query.index), "sensor": req.query.sensor}, sort:[{"createdAt": "desc"}], limit:1};
    db.find(query, function(err, data) {
      if(err){
        console.log(err)
        res.sendStatus(404);
        res.send(err);
      }
      res.send(data);
    });

  });

router.route('/last-event')
  .get(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.query.sensor === 'sensor1'){
      db = cloudantResult.db.use('sensor1-event');
    }

    if(req.query.sensor === 'sensor2'){
      db = cloudantResult.db.use('sensor2-event');
    }

    var query = {selector: {"createdAt": {"$gt": 0}}, sort:[{"createdAt": "desc"}], limit:1};
    db.find(query, function(err, data) {
      if(err){
        console.log(err)
        res.sendStatus(404);
        res.send(err);
      }
      res.send(data);
    });

  });

router.get('*', function (req, res) {
  res.send('Server with all route');
});



app.listen(port);

console.log('server is listening on : http://localhost:' + port);
