var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require( 'vinyl-source-stream' );
var plumber = require('gulp-plumber');
var react_jade = require('react-jade');

PAGES = ['books'];

PAGES.forEach(function(name) {
  gulp.task('build:' + name, function() {
    browserify({ entries: ['client/pages/' + name + '.js'], debug: true})
      .transform(babelify, {
        presets: ['stage-0', 'es2015', 'react']
      })
      .transform(react_jade)
      .bundle()
      .pipe(plumber())
      .pipe( source( name + '.js' ) )
      .pipe( gulp.dest( './app/static/bundle' ));
  });
});

gulp.task('build', PAGES.map(function(name) { return 'build:' + name; }));
