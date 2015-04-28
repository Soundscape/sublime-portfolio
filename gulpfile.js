(function () {
  'use strict';

  var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    help = plugins.help(gulp),
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
      css: './www/app.css',
      'default': 'index.html',
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
  gulp.task('clean', 'Removes prior build output', function () {
    // TODO: Make this async
    var fn = function (path) { rimraf.sync(path); };
    paths.clean.forEach(fn);
  });

  gulp.task('build', 'Builds the application', ['clean', 'coffee', 'browserify', 'jade', 'sass', 'fonts', 'assets', 'favicons', 'bump-patch']);

  gulp.task('watch', ['build'], function () {
    gulp.watch(paths.coffee, ['build']);
    gulp.watch(paths.jade, ['build']);
    gulp.watch(paths.sass, ['build']);
  });

  gulp.task('serve', 'Starts a LiveReload server', ['build'], function () {
    var opts = {
      livereload: true,
      directoryListing: true,
      open: paths['default']
    };

    return gulp.src(paths.www)
      .pipe(plugins.webserver(opts));
  });

  gulp.task('bump-major', 'Bumps the major build number', function () {
    return gulp.src(['./bower.json', './component.json', './package.json'])
      .pipe(plugins.bump({type: 'major'}))
      .pipe(gulp.dest('./'));
  });

  gulp.task('bump-minor', 'Bumps the minor build number', function () {
    return gulp.src(['./bower.json', './component.json', './package.json'])
      .pipe(plugins.bump({type: 'minor'}))
      .pipe(gulp.dest('./'));
  });

  gulp.task('bump-patch', 'Bumps the patch build number', function () {
    return gulp.src(['./bower.json', './component.json', './package.json'])
      .pipe(plugins.bump({type: 'patch'}))
      .pipe(gulp.dest('./'));
  });

  gulp.task('bump-prerelease', 'Bumps the prerelease build number', function () {
    return gulp.src(['./bower.json', './component.json', './package.json'])
      .pipe(plugins.bump({type: 'prerelease'}))
      .pipe(gulp.dest('./'));
  });

  gulp.task('default', 'Starts a LiveReload server and waits for changes', ['watch', 'serve']);

  // Conversion tasks
  gulp.task('browserify', 'Creates a Browserify bundle', function () {
    return browserify(paths.bundle)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(paths.www));
  });

  gulp.task('coffee', 'Transforms Coffeescript to JavaScript', function () {
    return gulp.src(paths.coffee)
      .pipe(plugins.coffee())
      .pipe(plugins.uglify())
      .pipe(gulp.dest(paths.www))
      .on('error', plugins.util.log.bind(plugins.util, 'CoffeeScript Error'));
  });

  gulp.task('sass', 'Transforms SASS to CSS', ['sass-map'], function () {
    return gulp.src(paths.css)
      .pipe(plugins.minifyCss({ }))
      .pipe(gulp.dest(paths.www))
      .on('error', plugins.util.log.bind(plugins.util, 'CSS Error'));
  });

  gulp.task('sass-map', 'Creates the SASS sourcemap', function () {
    return plugins.rubySass(paths.sass, { sourcemap: true, compass: true })
      .on('error', plugins.util.log.bind(plugins.util, 'SASS Error'))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(paths.www));
  });

  gulp.task('fonts', 'Copies fonts to output folder', function () {
    return gulp.src(paths.fonts.src)
      .pipe(gulp.dest(paths.fonts.out));
  });

  gulp.task('assets', 'Copies assets to output folder', function () {
    return gulp.src(paths.assets.src)
      .pipe(gulp.dest(paths.assets.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Favicon Error'));
  });

  gulp.task('favicons', 'Copies favicons to output folder', function () {
    return gulp.src(paths.favicons)
      .pipe(gulp.dest(paths.www));
  });

  gulp.task('jade', 'Transforms Jade to HTML', function () {
    return gulp.src(paths.jade)
      .pipe(plugins.jade())
      .pipe(plugins.minifyHtml({ conditionals: true, spare: true }))
      .pipe(gulp.dest(paths.www))
      .on('error', plugins.util.log.bind(plugins.util, 'Jade Error'));
  });

  // Test tasks
  gulp.task('test', 'Runs all Jasmine tests', ['build'], function () {
    return gulp.src(paths.test)
      .pipe(plugins.jasmine({ verbose: true, includeStackTrace: false }))
      .on('error', plugins.util.log.bind(plugins.util, 'Jasmine Error'));
  });

  gulp.task('coverage', 'Creates a coverage report for Jasmine tests', ['test'], function () {
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
