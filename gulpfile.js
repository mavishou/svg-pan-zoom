/**
 *  Modules
 */
var gulp   = require('gulp')
  , watch      = require('gulp-watch')
  , uglify     = require('gulp-uglify')
  , browserify = require('browserify')
  , source     = require('vinyl-source-stream')
  , streamify  = require('gulp-streamify')
  , rename     = require('gulp-rename')
  , qunit      = require('gulp-qunit')
  , jshint     = require('gulp-jshint')
  , jscs       = require('gulp-jscs')
  ;

/**
 *  Build script
 */
gulp.task('browserify', function() {
  return browserify({entries:'./src/stand-alone.js'})
    .bundle()
    .on('error', function (err) {
      console.log(err.toString())
      this.emit("end")
    })
    .pipe(source('svg-pan-zoom.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(streamify(rename('svg-pan-zoom.min.js')))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist/'))
});

/**
 * Watch script
 */
gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['browserify']);
});

/**
 * Test task
 */
gulp.task('test', function () {
  gulp.src('./tests/index.html')
    .pipe(qunit())
});

/**
 * Check
 */
gulp.task('check', function() {
  gulp.src('./src/*')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jscs())
})

/**
 * Build
 */
gulp.task('build', ['test', 'check', 'browserify'])

/**
 * Default task
 */
gulp.task('default', [
  'browserify',
  'watch'
]);

