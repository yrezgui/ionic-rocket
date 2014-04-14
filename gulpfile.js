var config      = require('./config.js');
var gulp        = require('gulp');
var clean       = require('gulp-clean');
var browserify  = require('gulp-browserify');
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
  return gulp.src('src/scripts/app.js')
             .pipe(browserify({
                insertGlobals : true,
                debug : true
             }))
             .pipe(gulp.dest(path.join(config.path.build, 'js')));
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

function viewsTask() {
  return gulp.src(['src/views/templates/**/*.jade'])
             .pipe(jade({pretty: true}))
             .pipe(gulp.dest(path.join(config.path.build, 'tpl')));
}

function indexTask() {
  return gulp.src('src/views/index.jade')
             .pipe(jade({pretty: true}))
             .pipe(gulp.dest(config.path.build));
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

gulp.task('index', function(){
  return indexTask();
});

gulp.task('watch', ['clean'], function(){

  return Q.all([
    toPromise(configTask()),
    toPromise(resourcesTask()),
    toPromise(scriptsTask()),
    toPromise(fontsTask()),
    toPromise(imagesTask()),
    toPromise(stylesTask()),
    toPromise(viewsTask()),
    toPromise(indexTask())
    
  ]).then(function watch() {

      console.log('watching...');

      gulp.watch(config.path.styles,    ['styles']);
      gulp.watch(config.path.scripts,   ['scripts']);
      gulp.watch(config.path.images,    ['images']);
      gulp.watch(config.path.fonts,     ['fonts']);
      gulp.watch(config.path.configs,   ['config']);
      gulp.watch(config.path.resources, ['resources']);
      gulp.watch(config.path.views,     ['views', 'index']);
  });
});

gulp.task('default', ['watch']);