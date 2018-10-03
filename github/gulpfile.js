const gulp = require('gulp'),
    precss = require('precss'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    del = require('del'), // added to delete files and folders
    cssnano = require('cssnano'), // added to minimize css
    cache = require('gulp-cache'); // added for caching



gulp.task('css', function () {
  var processors = [
        cssnano({autoprefixer: {
          browsers:['last 16 versions'],
          add: true
        }}),
        precss
  ];
  return gulp.src('src/assets/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( gulp.dest('./dist/assets/css') )
    .pipe(browserSync.reload({stream: true})) // autoreload CSS
});

gulp.task('javascript', function () {

  return gulp.src('src/js/*.js')
    .pipe( gulp.dest('./dist/js') )
    .pipe(browserSync.reload({stream: true})) // autoreload JS
});

gulp.task('browser-sync', function() {
  browserSync({ // browserSync initializing
    server: { // define server parameters
      baseDir: './' // server's folder - src
    },
    notify: false // disabling notifications
  });
});

gulp.task('watch', ['browser-sync' , 'css' , 'javascript'], function() {
  gulp.watch('src/assets/css/**/*.css' , ['css']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', ['javascript'])
});

gulp.task('clean', function() {
  return del.sync('dist'); // del dist folder before NEW build
});

gulp.task('build', ['clean', 'css'], function() {

  const buildCss = gulp.src([ // CSS transfer to production folder
    'src/assets/css/main.css',
  ])
  .pipe(gulp.dest('dist/assets/css'));

  const buildFonts = gulp.src('src/assets/fonts/**/*') // Fonts transfer to production folder
  .pipe(gulp.dest('dist/assets/fonts'));

  const buildJs = gulp.src('src/js/**/*') // Javascript transfer to production folder
  .pipe(gulp.dest('dist/js'));

  const buildImg = gulp.src('src/assets/img/**/*')
  .pipe(gulp.dest('dist/assets/img'));

  // var buildHtml = gulp.src('src/*html') /*OUTDATED*/
  // .pipe(gulp.dest('dist'));

});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
