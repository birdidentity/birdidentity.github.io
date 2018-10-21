'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const easyImport = require('postcss-easy-import');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const del = require('del');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const pngquant = require('pngquant');
const sprite = require('gulp.spritesmith');


gulp.task('sprite', function() {
    var spriteData = gulp.src('./src/assets/img/sprite3/*.*')
        .pipe(sprite({
            imgName: 'sprite3.png',
            cssName: 'sprite3.css',
        }));

    spriteData.img.pipe(gulp.dest('./src/assets/img'));
    spriteData.css.pipe(gulp.dest('./src/assets/css/components'));
});



gulp.task('img', function() {
	return gulp.src('src/assets/img/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/assets/img'));
});



gulp.task('css', function () {
  return gulp.src('src/assets/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe(postcss([
      easyImport,
      precss,
      autoprefixer({browsers: ['last 2 versions']}),
      cssnano()
    ]))
    .pipe( gulp.dest('./dist/assets/css') )
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
  browserSync({ // browserSync initializing
    server: { // define server parameters
      baseDir: './' // server's folder - src
    },
    notify: false // disabling notifications
  });
});


gulp.task('watch', ['browser-sync' , 'css' , 'img'], function() {
  gulp.watch('src/assets/css/**/*.css' , ['css']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('src/assets/img/**/*', function(event) {
    gulp.run('img');
  });
});


gulp.task('clean', function() {
  return del.sync('dist'); // del dist folder before NEW build
});


gulp.task('build', ['clean', 'css', 'img'], function() {

  gulp.src([ // CSS transfer to production folder
    'src/assets/css/main.css',
  ])
  .pipe(gulp.dest('dist/assets/css'));

  gulp.src('src/assets/fonts/**/*') // Fonts transfer to production folder
  .pipe(gulp.dest('dist/assets/fonts'));


  gulp.src('src/assets/img/**/*')
  .pipe(gulp.dest('dist/assets/img'));

});


gulp.task('clean', function() {
  return del.sync('dist'); // del dist folder before NEW build
});


gulp.task('clear', function() {
  return cache.clearAll();
});


gulp.task('default', ['watch']);
