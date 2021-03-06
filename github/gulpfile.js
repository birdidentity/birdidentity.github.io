const gulp = require('gulp'),
      precss = require('precss'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'), // added to minimize css
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      del = require('del'), // added to delete files and folders
      cache = require('gulp-cache'), // added for caching
      EasyImport = require('postcss-easy-import'),
      concat = require('gulp-concat');


gulp.task('css', function () {
  const plugins = [
        EasyImport,
        precss,
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano(),
  ];
  return gulp.src('src/assets/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe(postcss(plugins))
    .pipe( gulp.dest('./dist/assets/css') )
    .pipe(browserSync.reload({stream: true})) // autoreload CSS
});

gulp.task('javascript', function () {

  return gulp.src(['./src/js/widget/navigation.js', './src/js/widget/description.js', './src/js/widget/search-form.js', './src/js/widget/tabs.js', './src/js/widget/pagination.js'])
    .pipe(concat('script.js'))
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

  gulp.src([ // CSS transfer to production folder
    'src/assets/css/main.css',
  ])
  .pipe(gulp.dest('dist/assets/css'));

  gulp.src('src/assets/fonts/**/*') // Fonts transfer to production folder
  .pipe(gulp.dest('dist/assets/fonts'));

  gulp.src('src/js/**/*') // Javascript transfer to production folder
  .pipe(gulp.dest('dist/js'));

  gulp.src('src/assets/img/**/*')
  .pipe(gulp.dest('dist/assets/img'));

});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
