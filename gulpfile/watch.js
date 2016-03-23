var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch:assets', ['assets'], function(){
  livereload.listen();
  gulp.watch('./assets/stylesheets/**/*.styl', ['assets:css']);
});
gulp.task('watch:build', ['build'], function(){
  livereload.listen();
  gulp.watch('./client/**/*.js', ['build']);
  gulp.watch('./client/**/*.jade', ['build']);
});

gulp.task('watch', ['watch:assets', 'watch:build']);
