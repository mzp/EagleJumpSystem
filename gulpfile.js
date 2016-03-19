var gulp = require('gulp');

require('./gulpfile/assets');
require('./gulpfile/watch');

gulp.task('default', ['assets']);
