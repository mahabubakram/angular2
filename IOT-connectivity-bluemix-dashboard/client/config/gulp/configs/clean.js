const del = require('del');
const environmentUtils = require('../../environment-utils');

const environment = environmentUtils.getEnvironment();
const dist = environment.dist;
const output = environment.output;
const src = environment.src;
const patterns = environmentUtils.getPatterns();
const jsPattern = patterns.js;
const map = patterns.map;

function clean(...src) {
  return () => del(src, {force: true})

}

const cleanDist = clean(dist);
const cleanOutput = clean(output);
const cleanSrc = clean(src + jsPattern, src + map, '!' + src + 'app/systemjs.config.js');

Object.defineProperty(cleanDist, 'name', {
  value: 'cleanDist'
});

Object.defineProperty(cleanOutput, 'name', {
  value: 'cleanOutput'
});

Object.defineProperty(cleanSrc, 'name', {
  value: 'cleanSrc'
});

exports.cleanDist = cleanDist;
exports.cleanOutput = cleanOutput;
exports.cleanSrc = cleanSrc;
