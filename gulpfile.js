var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    path = require('path');

var paths = {
  www: './www/',
  clean: ['./www/', './coverage'],
  coffee: ['./src/*.coffee', './src/**/*.coffee'],
  sass: ['./src/*.scss', './src/**/*.scss'],
  jade: ['./src/*.jade', './src/**/*.jade'],
  test: ['./www/test/*.spec.js'],
  js: ['./www/*.js', './www/**/*.js'],
  bundle: ['./www/app.js']
}

// Utility tasks
gulp.task('clean', function() {
  // TODO: Make this async
  var fn = function(path) { rimraf.sync(path) };
  paths.clean.forEach(fn);
});

gulp.task('build', ['clean', 'coffee', 'jade', 'sass']);

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['watch']);

// Conversion tasks
gulp.task('coffee', function() {
  return gulp.src(paths.coffee)
    .pipe(plugins.coffee())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.www))
    .on('error', plugins.util.log.bind(plugins.util, 'CoffeeScript Error'))
    .on('finish', function() {
      gulp.src(paths.bundle)
        .pipe(plugins.browserify({ insertGlobals: true, debug: gulp.env.production }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.www));
    });
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(plugins.sass())
    .pipe(plugins.minifyCss({ keepBreaks: false }))
    .pipe(gulp.dest(paths.www))
    .on('error', plugins.util.log.bind(plugins.util, 'SASS Error'));
});

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(plugins.jade())
    .pipe(plugins.minifyHtml({ conditionals: true, spare: true }))
    .pipe(gulp.dest(paths.www))
    .on('error', plugins.util.log.bind(plugins.util, 'Jade Error'));
});

// Test tasks
gulp.task('test', ['build'], function() {
  return gulp.src(paths.test)
    .pipe(plugins.jasmine({ verbose: true, includeStackTrace: false }))
    .on('error', plugins.util.log.bind(plugins.util, 'Jasmine Error'));
});

gulp.task('coverage', ['test'], function() {
  return gulp.src(paths.js)
    .pipe(plugins.istanbul())
    .on('error', plugins.util.log.bind(plugins.util, 'Istanbul Error'))
    .on('finish', function() {
      gulp.src(paths.test)
        .pipe(plugins.jasmine())
        .pipe(plugins.istanbul.writeReports());
    });
});
