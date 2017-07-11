'use strict';

var express = require('express');
var controller = require('./talk.controller');

var router = express.Router();

router.get('/:uuid', controller.getAllTalks);

module.exports = router;
