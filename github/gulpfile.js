var gulp = require('gulp'),
    precss = require('precss'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    cssnano = require('cssnano'), // Подключаем пакет для минификации css
    concat = require('gulp-concat'), //Подключаем gulp- concat для конкатенации файлов
    cssnext = require('postcss-preset-env'),
    responsive = require('postcss-responsive-type'),
    cache = require('gulp-cache'); // Подключаем библиотеку кеширования



gulp.task('css', function () {
  var processors = [
        cssnano({autoprefixer: {
          browsers:['last 16 versions'],
          add: true
        }}),
        precss,
        // cssnano({autoprefixer: {
        //    browsers:['last 16 versions'],
        //    add: true
        // }})
  ];
  return gulp.src('app/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( gulp.dest('./dest/css') )
    .pipe(browserSync.reload({stream: true})) // обновляем css настранице
});

gulp.task('javascript', function () {

  return gulp.src('app/js/*.js')
    .pipe( sourcemaps.init() )
    .pipe( gulp.dest('./dest/js') )
    .pipe(browserSync.reload({stream: true})) // обновляем js настранице
});

gulp.task('browser-sync', function() {
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: './' // Директория для сервера - app
    },
    notify: false // отключаем уведомления
  });
});

gulp.task('watch', ['browser-sync' , 'css' , 'javascript'], function() {
  gulp.watch('app/css/**/*.css' , ['css']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('dest/js/**/*.js', ['javascript'])
});

gulp.task('clean', function() {
  return del.sync('dest'); // удаляем папку dest перед сборкой
});

gulp.task('build', ['clean', 'css'], function() {

  var buildCss = gulp.src([ // переносим СSS стили в продакшен
    'app/css/main.css',
  ])
  .pipe(gulp.dest('dest/css'));

  var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('dest/fonts'));

  var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
  .pipe(gulp.dest('dest/js'))

  var buildHtml = gulp.src('app/*html') // Переносим HTML в продакшен
  .pipe(gulp.dest('dest'));

});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
