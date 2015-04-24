(function () {
  'use strict';

  var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    path = require('path'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    paths = {
      www: './www/',
      clean: ['./www/', './coverage'],
      coffee: ['./src/*.coffee', './src/**/*.coffee'],
      sass: './src/app.scss',
      jade: ['./src/*.jade', './src/**/*.jade'],
      test: ['./www/test/*.spec.js'],
      js: ['./www/*.js', './www/**/*.js'],
      bundle: ['./www/app.js'],
      default: 'index.html',
      assets: {
        src: ['./assets/*.*', './assets/**/*.*'],
        out: './www/assets/'
      },
      fonts: {
        src: ['./bower_components/materialize/font/*.*', './bower_components/materialize/font/**/*.*'],
        out: './www/font/'
      },
      favicons: ['./favicons/*.*']
    };

  // Utility tasks
  gulp.task('clean', function () {
    // TODO: Make this async
    var fn = function (path) { rimraf.sync(path); };
    paths.clean.forEach(fn);
  });

  gulp.task('build', ['clean', 'coffee', 'browserify', 'jade', 'sass', 'fonts', 'assets', 'favicons']);

  gulp.task('watch', ['build'], function () {
    gulp.watch(paths.coffee, ['build']);
    gulp.watch(paths.jade, ['build']);
    gulp.watch(paths.sass, ['build']);
  });

  gulp.task('serve', ['build'], function () {
    var opts = {
      livereload: true,
      directoryListing: true,
      open: paths.default
    };

    return gulp.src(paths.www)
      .pipe(plugins.webserver(opts));
  });

  gulp.task('default', ['watch', 'serve']);

  // Conversion tasks
  gulp.task('browserify', function () {
    return browserify(paths.bundle)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(paths.www));
  });

  gulp.task('coffee', function () {
    return gulp.src(paths.coffee)
      .pipe(plugins.coffee())
      .pipe(plugins.uglify())
      .pipe(gulp.dest(paths.www))
      .on('error', plugins.util.log.bind(plugins.util, 'CoffeeScript Error'));
  });

  gulp.task('sass', function () {
    return plugins.rubySass(paths.sass, { sourcemap: true, compass: true })
    .on('error', plugins.util.log.bind(plugins.util, 'SASS Error'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.www));
  });

  gulp.task('fonts', function() {
    return gulp.src(paths.fonts.src)
      .pipe(gulp.dest(paths.fonts.out));
  });

  gulp.task('assets', function() {
    return gulp.src(paths.assets.src)
      .pipe(gulp.dest(paths.assets.out));
  });

  gulp.task('favicons', function() {
    return gulp.src(paths.favicons)
      .pipe(gulp.dest(paths.www));
  });

  gulp.task('jade', function () {
    return gulp.src(paths.jade)
      .pipe(plugins.jade())
      .pipe(plugins.minifyHtml({ conditionals: true, spare: true }))
      .pipe(gulp.dest(paths.www))
      .on('error', plugins.util.log.bind(plugins.util, 'Jade Error'));
  });

  // Test tasks
  gulp.task('test', ['build'], function () {
    return gulp.src(paths.test)
      .pipe(plugins.jasmine({ verbose: true, includeStackTrace: false }))
      .on('error', plugins.util.log.bind(plugins.util, 'Jasmine Error'));
  });

  gulp.task('coverage', ['test'], function () {
    return gulp.src(paths.js)
      .pipe(plugins.istanbul())
      .on('error', plugins.util.log.bind(plugins.util, 'Istanbul Error'))
      .on('finish', function () {
        gulp.src(paths.test)
          .pipe(plugins.jasmine())
          .pipe(plugins.istanbul.writeReports());
      });
  });
})();
