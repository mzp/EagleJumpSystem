var gulp = require('gulp');

gulp.task('watch:assets', ['assets'], function(){
  gulp.watch('./assets/stylesheets/**/*.styl', ['assets:css']);
});
gulp.task('watch:build', ['build'], function(){
  gulp.watch('./client/**/*.js', ['build']);
  gulp.watch('./client/**/*.jade', ['build']);
});

gulp.task('watch', ['watch:assets', 'watch:build']);
