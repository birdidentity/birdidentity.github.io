var gulp = require('gulp'),
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
  return gulp.src('app/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( gulp.dest('./dist/css') )
    .pipe(browserSync.reload({stream: true})) // autoreload CSS
});

gulp.task('javascript', function () {

  return gulp.src('app/js/*.js')
    .pipe( gulp.dest('./dist/js') )
    .pipe(browserSync.reload({stream: true})) // autoreload JS
});

gulp.task('browser-sync', function() {
  browserSync({ // browserSync initializing
    server: { // define server parameters
      baseDir: './' // server's folder - app
    },
    notify: false // disabling notifications
  });
});

gulp.task('watch', ['browser-sync' , 'css' , 'javascript'], function() {
  gulp.watch('app/css/**/*.css' , ['css']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', ['javascript'])
});

gulp.task('clean', function() {
  return del.sync('dist'); // del dist folder before NEW build
});

gulp.task('build', ['clean', 'css'], function() {

  const buildCss = gulp.src([ // CSS transfer to production folder
    'app/css/main.css',
  ])
  .pipe(gulp.dest('dist/css'));

  const buildFonts = gulp.src('app/fonts/**/*') // Fonts transfer to production folder
  .pipe(gulp.dest('dist/fonts'));

  const buildJs = gulp.src('app/js/**/*') // Javascript transfer to production folder
  .pipe(gulp.dest('dist/js'))

  // var buildHtml = gulp.src('app/*html') /*OUTDATED*/
  // .pipe(gulp.dest('dist'));

});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
