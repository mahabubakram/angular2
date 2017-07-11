const path = require('path');
// Webpack runs in directory ./client/config because of that root is always project root
const _root = path.resolve(__dirname, '../../');

/**
 * Checks if given module by name or path is available
 * @param module
 * @returns {boolean}
 */
exports.moduleAvailable = function moduleAvailable(module) {
    try {
        require.resolve(module);
        return true;
    } catch(e){}
    return false;
};

/**
 * Renames given gulp task to achieve readable name in gulp console
 * @param gulpTask
 * @param name
 */
exports.nameGulpTask = function (gulpTask, name) {
    Object.defineProperty(gulpTask, 'name', {
        value: name
    });
};

/**
 * Calculates the absolute path from given args an _root, with is needed by webpack to resolve, aggregate and bundle dependencies
 * @param args
 * @returns {String}
 */
exports.root = function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
};

