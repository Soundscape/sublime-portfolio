(function () {
  'use strict';

  var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    NwBuilder = require('node-webkit-builder'),
    help = plugins.help(gulp),
    rimraf = require('rimraf'),
    path = require('path'),
    browserify = require('browserify'),
    smushit = require('node-smushit'),
    source = require('vinyl-source-stream'),
    paths = {
      out: './out/',
      clean: ['./out/'],
      bundle: ['./out/modules/app.js'],
      coffee: ['./src/*.coffee', './src/**/*.coffee'],
      cjsx: ['./src/*.cjsx', './src/**/*.cjsx'],
      sass: './src/sass/app.scss',
      css: './out/app.css',
      views: ['./src/*.jade', './src/**/*.jade'],
      temp: ['./out/components/', './out/modules'],
      scripts: ['./out/*.js', './out/**/*.js'],
      fonts: {
        src: ['./bower_components/materialize/font/*.*', './bower_components/materialize/font/**/*.*'],
        out: './out/font/'
      },
      assets: {
        src: ['./src/assets/*.*', './src/assets/**/*.*'],
        out: './out/assets/'
      },
      favicons: ['./src/favicons/*.*']
    };

  // Utility tasks
  gulp.task('clean', 'Removes prior build output', function () {
    // TODO: Make this async
    var fn = function (path) { rimraf.sync(path); };
    paths.clean.forEach(fn);
  });

  gulp.task('temp', 'Removes temp build output', ['build'], function () {
    // TODO: Make this async
    var fn = function (path) { rimraf.sync(path); };
    paths.temp.forEach(fn);
  });

  gulp.task('watch', ['temp'], function () {
    gulp.watch(paths.coffee, ['temp']);
    gulp.watch(paths.cjsx, ['temp']);
    gulp.watch(paths.views, ['views']);
    gulp.watch(paths.sass, ['sass']);
  });

  gulp.task('run', ['temp'], function() {
    var svr = plugins.liveServer.new('./out/server.js');
    svr.start();

    gulp.watch(['./out/app.js', './out/app.css', './out/**/*.html'], svr.notify);
    gulp.watch(['./out/server.js'], svr.start);
  });

  gulp.task('build', 'Builds the application', ['clean', 'fonts', 'assets', 'views', 'browserify', 'sass']);

  gulp.task('default', ['watch', 'run']);

  // Conversion tasks
  gulp.task('views', function() {
    return gulp.src(paths.views)
      .pipe(plugins.jade())
      .pipe(plugins.minifyHtml({ conditionals: true, spare: true }))
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Jade Error'));
  });

  gulp.task('coffee', function() {
    return gulp.src(paths.coffee)
      .pipe(plugins.coffee())
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'CoffeeScript Error'));
  });

  gulp.task('browserify', 'Creates a Browserify bundle', ['coffee', 'cjsx'], function () {
    return browserify(paths.bundle)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'));
  });

  gulp.task('scripts', ['browserify'], function() {
    return gulp.src(paths.scripts)
      .pipe(plugins.uglify())
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Uglify Error'));
  });

  gulp.task('sass', 'Creates the SASS sourcemap', function () {
    return plugins.rubySass(paths.sass, { sourcemap: true, compass: true })
      .on('error', plugins.util.log.bind(plugins.util, 'SASS Error'))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(paths.out));
  });

  gulp.task('cjsx', 'Transform CJSX files to JavaScript', function() {
    gulp.src(paths.cjsx)
      .pipe(plugins.cjsx({ bare: true }))
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'CJSX Error'));
  });

  gulp.task('fonts', function() {
    gulp.src(paths.fonts.src)
      .pipe(gulp.dest(paths.fonts.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Fonts Error'));
  });

  gulp.task('assets', function() {
    gulp.src(paths.assets.src)
      .pipe(gulp.dest(paths.assets.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Fonts Error'));
  });

  gulp.task('smushit', ['assets'], function() {
    smushit.smushit(paths.assets.out, { recursive: true })
  });
})();
