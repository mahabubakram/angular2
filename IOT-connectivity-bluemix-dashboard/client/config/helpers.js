const path = require('path');
const _root = path.resolve(__dirname, '../../');

exports.moduleAvailable = function moduleAvailable(module) {
    try {
        require.resolve(module);
        return true;
    } catch(e){}
    return false;
};

exports.root = function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
};

