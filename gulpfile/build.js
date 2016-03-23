var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require( 'vinyl-source-stream' );
var plumber = require('gulp-plumber');
var react_jade = require('react-jade');
var livereload = require('gulp-livereload');

PAGES = ['books', 'upload', 'text', 'faces'];

gulp.task('build', function() {
    browserify({ entries: ['client/main.js'], debug: true})
      .transform(babelify, {
        presets: ['stage-0', 'es2015', 'react']
      })
      .transform(react_jade)
      .bundle()
      .on('error', function (err) {
        console.log(err.toString());
        this.emit("end");
      })
      .pipe(plumber())
      .pipe( source( 'main.js' ) )
      .pipe( gulp.dest( './app/static/bundle' ))
      .pipe(livereload());
});
