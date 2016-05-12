'use strict';

let path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    webpack = require('gulp-webpack'),
    babel = require('gulp-babel'),
    shell = require('gulp-shell'),
    Server = require('karma').Server,
    $ = require('gulp-load-plugins')(),
    uglify = require('gulp-uglify');

// set variable via $ gulp --type production
let environment = $.util.env.type || 'development';
let isProduction = environment === 'production';
let webpackConfig = require('./webpack.config.js').getConfig(environment);
let port = $.util.env.port || 8080;

var paths = {
  mainScript: 'lib/index.js',
  tests: ['spec/**/*.spec.js'],
  tmp: ['.module-cache','.tmp','dist/js'],
  destroot: 'dist',
  destjs: 'dist',
};

gulp.task('scripts', function(){
  return gulp.src(webpackConfig.entry)
    .on('error', function(error) {
      console.log('ERROR: ' + error.toString());
      this.emit("end");
    })
    .pipe($.webpack(webpackConfig))
    .pipe(uglify())
    .pipe(gulp.dest(paths.destjs))
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.tmp).then(function (deleted) {
    console.log('Deleted files/folders:\n', deleted.join('\n'));
  });
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.tests, ['test']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch','scripts']);
