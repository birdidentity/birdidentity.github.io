var gulp = require('gulp'),
    precss = require('precss'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    a_pp = require('adaptive-pixel-perfect').create(),
    jquery = require('jquery'),
    pixelperfect = require('jquery-pixel-perfect');

var port = 3010,
    folderForDesignScreenshots = "Design",
    portForBrowserSync = 3000;

$(document).ready(function() {
  $('body').pixelPerfect({
    path: 'img/index.1440.png', //default mockup path
    draggable: true, //draggable state
    topBtnCode: 38, //default is "Up arrow" key
    rightBtnCode: 39, //default is "Right arrow" key
    bottomBtnCode: 40, //default is "Bottom arrow" key
    leftBtnCode: 37, //default is "Left arrow" key
    opacityIncBtnCode: 81, //default is "Q" key
    opacityDecBtnCode: 87, //defauls is "W" key
    positionBtnCode: 70, //default is "F" key
    visibilityBtnCode: 83 //default is "S" key
  });
});

gulp.task('css', function () {
  var processors = [
        autoprefixer({browsers: ['last 16 version']}),
        precss,
        cssnext
  ];
  return gulp.src('app/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( gulp.dest('./dest/css') );
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: "./",
    cors: true,
    middleware: function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    },
    socket: {
      domain: 'localhost:' + portForBrowserSync
    },
    scriptPath: function (path, port, options) {
      return "http://" + options.getIn(['socket', 'domain']) + path;
    }
  });
  a_pp.start(port, folderForDesignScreenshots, portForBrowserSync);
});
