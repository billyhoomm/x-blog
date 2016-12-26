'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

gulp.task('manifest', function () {
  gulp.src(['dist/static/**/*.{js,css}'], {base: './dist'})
    .pipe($.manifest({
      hash: true,
      preferOnline: true,
      prefix: 'http://xiangsongtao.com/',
      network: ['*'],
      cache: [
        'http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css',
        'http://cdn.bootcss.com/font-awesome/4.6.3/fonts/fontawesome-webfont.woff2?v=4.6.3',
      ],
      filename: 'app.manifest',
      exclude: ['app.manifest'],
      // fallback:'/ /offline.html',
    }))
    .pipe(gulp.dest('dist'));
});
