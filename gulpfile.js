var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');

gulp.task('build:css', function () {
  gulp.src('./assets/stylesheets/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      'paths' : [
        'node_modules/purecss/build/'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/static'));
});

gulp.task('default', ['build:css']);
