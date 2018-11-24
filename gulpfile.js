const gulp = require('gulp');
const webpack = require('webpack-stream');
const serve = require('gulp-serve');

gulp.task('build-css', function() {
  return gulp.src('custom.css')
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('build-html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('public/'));
});

function build(mode) {
  var webpackConfig = require('./webpack.config');
  webpackConfig = {...webpackConfig, mode: mode || "development"};

  return gulp.src('src/index.tsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('public/js/'));
}

gulp.task('build', ['build-css', 'build-html'], function() {
  return build('development');
});

gulp.task('serve', ['build'], serve({root: 'public', port: 42042}));

gulp.task('watch', function() {
  gulp.watch('src/**/*.+(ts|tsx)', ['build']);
  gulp.watch('index.html', ['build-html']);
  gulp.watch('custom.css', ['build-css']);
});

gulp.task('default', ['watch', 'serve']);
