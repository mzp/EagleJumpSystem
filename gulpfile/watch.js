var gulp = require('gulp');

gulp.task('watch:assets', ['assets'], function(){
  gulp.watch('./assets/stylesheets/**/*.styl', ['assets:css']);
});

gulp.task('watch', ['watch:assets']);
