const gulp = require('gulp');
const {src, dest} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const srcFolder = 'src/';

function css() {
  return src(srcFolder + 'style.scss').pipe(sass()).pipe(dest(srcFolder + 'css')).pipe(browserSync.stream());
}

function reload() {
  return src(srcFolder).pipe(browserSync.stream());
}

gulp.task('browser_sync', function () {
  browserSync.init({
    server: {
      baseDir: srcFolder
    },
    port: 3000,
  });
});

gulp.task('watchFiles', function () {
  gulp.watch(srcFolder + 'style.scss', css);
  gulp.watch(srcFolder + 'index.html', reload);
  gulp.watch(srcFolder + 'main.js', reload);
});

gulp.task('default', gulp.parallel(css, 'watchFiles', 'browser_sync'));
