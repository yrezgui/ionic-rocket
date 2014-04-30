var config      = require('./config.js');
var gulp        = require('gulp');
var clean       = require('gulp-clean');
var jade        = require('gulp-jade');
var less        = require('gulp-less');
var es          = require('event-stream');
var path        = require('path');
var Q           = require('q');

function toPromise(stream) {
  var deferred = Q.defer();

  stream.on('end', function end() {
    deferred.resolve();
  });

  return deferred.promise;
}

function cleanTask() {
  return gulp.src(config.path.build, {read: false})
             .pipe(clean());
}

function configTask() {
  return gulp.src(config.path.configs)
             .pipe(gulp.dest(config.path.build));
}

function resourcesTask() {
  return gulp.src(config.path.resources)
             .pipe(gulp.dest(path.join(config.path.build, 'res')));
}

function scriptsTask() {
  return es.concat(
    gulp.src(config.path.scripts),
    gulp.src(config.scripts.dependencies)

  ).pipe(gulp.dest(config.path.build));
}

function fontsTask() {
  return es.concat(
    gulp.src(config.path.fonts),
    gulp.src(config.externalFiles.fonts)

  ).pipe(gulp.dest(path.join(config.path.build, 'fonts')));
}

function imagesTask() {
  return gulp.src(config.path.images)
             .pipe(gulp.dest(path.join(config.path.build, 'img')));
}

function stylesTask() {
  return es.concat(
    gulp.src('src/styles/app.less').pipe(less()),
    gulp.src(config.externalFiles.styles)

  ).pipe(gulp.dest(path.join(config.path.build, 'css')));
}

function scriptsAssets() {
  var deferred = Q.defer();
  var list = [];
  var files = config.scripts.dependencies.slice();
  files.push('src/**/*.js');

  gulp.src(files)
      .on('data', function process(file) {
        list.push(file.path.split(file.base)[1]);
      })
      .on('end', function process(file) {
        deferred.resolve(list);
      });

  return deferred.promise;
}

function viewsTask() {

  return scriptsAssets().then(function process(files) {
    return toPromise(
      gulp.src('src/**/*.jade')
          .pipe(jade({pretty: true, locals: {files: files}}))
          .pipe(gulp.dest(config.path.build))
    );
  });
}

gulp.task('clean', function(){
  return cleanTask();
});

gulp.task('config', function() {
  return configTask();
});

gulp.task('resources', function() {
  return resourcesTask();
});

gulp.task('scripts', function() {
  return scriptsTask();
});

gulp.task('fonts', function() {
  return fontsTask();
});

gulp.task('images', function() {
  return imagesTask();
});

gulp.task('styles', function(){
  return stylesTask();
});

gulp.task('views', function(){
  return viewsTask();
});

gulp.task('watch', ['clean'], function(){

  return Q.all([
    toPromise(configTask()),
    toPromise(resourcesTask()),
    toPromise(scriptsTask()),
    toPromise(fontsTask()),
    toPromise(imagesTask()),
    toPromise(stylesTask()),
    toPromise(viewsTask())
    
  ]).then(function watch() {

      console.log('watching...');

      gulp.watch(config.path.styles,    ['styles']);
      gulp.watch(config.path.scripts,   ['scripts']);
      gulp.watch(config.path.images,    ['images']);
      gulp.watch(config.path.fonts,     ['fonts']);
      gulp.watch(config.path.configs,   ['config']);
      gulp.watch(config.path.resources, ['resources']);
      gulp.watch(config.path.views,     ['views']);
  });
});

gulp.task('default', ['watch']);