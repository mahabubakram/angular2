const gutil = require('gulp-util');

function exportTasks(gulp) {
  try{
    const gulpConfig = require(gulp);
    Object.keys(gulpConfig).forEach( taskName => exports[taskName] = gulpConfig[taskName]);
  } catch (e) {
    exports[`gulpfile: ${gulp} not found!`] = () => gutil.log(`gulpfile: ${gulp} not found!`);
  }

}

exportTasks('./client/gulpfile');
exportTasks('./server/gulpfile');
