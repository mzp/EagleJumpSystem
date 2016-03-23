var gulp = require('gulp');

var fontAwesome = require('node-font-awesome');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');

gulp.task('assets:css', function () {
  gulp.src('./assets/stylesheets/main.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      'paths' : [
        'node_modules/purecss/build/',
        'node_modules/font-awesome/css'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/static'))
    .pipe(livereload());
});

gulp.task('assets:font', function () {
  gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest('./app/static/fonts'));
});

gulp.task('assets', ['assets:css', 'assets:font']);
