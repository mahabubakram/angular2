'use strict';
const {defaultTask} = require('./config/gulp/tasks/default');
const {watch} = require('./config/gulp/tasks/watch');
const {unittest} = require('./config/gulp/tasks/unittest');
const {e2e} = require('./config/gulp/tasks/e2e');
const {cleanSrc} = require('./config/gulp/configs/clean');

exports['client-default'] = defaultTask;

exports['client-watch'] = watch;

exports['client-unittest'] = unittest;

exports['client-e2e'] = e2e;

exports['client-clean-src'] = cleanSrc;
