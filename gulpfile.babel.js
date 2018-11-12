import gulp from 'gulp';
import livereload from 'gulp-livereload';
import nodemon from 'nodemon';
import notify from 'gulp-notify';

gulp.task('default', () => {
  // listen for changes
  livereload.listen();
  // configure nodemon
  nodemon({
    // the script to run the app
    script: 'app.js',
    ext: 'js',
  }).on('restart', () => {
    // when the app has restarted, run livereload.
    gulp.src('app.js')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
  });
});
