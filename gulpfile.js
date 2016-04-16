var gulp = require('gulp');

require('./gulpfile/assets');
require('./gulpfile/build');
require('./gulpfile/watch');

gulp.task('default', ['assets', 'build']);
