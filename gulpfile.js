var config      = require('./config.js');
var gulp        = require('gulp');
var clean       = require('gulp-clean');
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var es          = require('event-stream');
var path        = require('path');
var Q           = require('q');

var assetsMap = {};

function toPromise(stream) {
  var deferred = Q.defer();

  stream.on('end', function end() {
    deferred.resolve();
  });

  return deferred.promise;
}

function changeFolder(subfolder) {
  return es.through(function process(data) {
    var finalpath = path.relative(data.base, data.path);
    finalpath = path.join(subfolder, finalpath);

    data.path = path.join('/tmp', finalpath);
    data.base = '/tmp/';
    this.emit('data', data);
  });
}

function updateAssetsMap(type) {
  if(!assetsMap[type]) {
    assetsMap[type] = [];
  }

  return es.mapSync(function process(data) {
    assetsMap[type].push(data.path.split(data.base)[1]);
    return data;
  });
}

function cleanTask() {
  return gulp.src(config.path.build, {read: false})
             .pipe(clean());
}

function configTask() {
  return gulp.src(config.path.configs)
             .pipe(gulp.dest(config.path.build));
}

function scriptsTask() {
  return es.concat(
    gulp.src(config.path.scripts).pipe(updateAssetsMap('scripts')),
    gulp.src(config.scripts.dependencies).pipe(changeFolder('deps')).pipe(updateAssetsMap('dependencies'))

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
    gulp.src(config.path.styles).pipe(sass()),
    gulp.src(config.externalFiles.styles)

  ).pipe(changeFolder('css')).pipe(updateAssetsMap('styles')).pipe(gulp.dest(path.join(config.path.build)));
}

function viewsTask() {

  return gulp.src('src/**/*.jade')
             .pipe(jade({pretty: true, locals: {assets: assetsMap}}))
             .pipe(gulp.dest(config.path.build));
}

gulp.task('clean', function(){
  return cleanTask();
});

gulp.task('config', function() {
  return configTask();
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
  return Q.all([
    toPromise(scriptsTask()),
    toPromise(stylesTask())
  ]).then(function finish() {
    
    return toPromise(viewsTask());
  });
});

gulp.task('watch', ['clean'], function(){

  return Q.all([
    toPromise(configTask()),
    toPromise(scriptsTask()),
    toPromise(fontsTask()),
    toPromise(imagesTask()),
    toPromise(stylesTask())
  ])
    .then(function finish() {
      return toPromise(viewsTask());
    })
    .then(function watch() {

      console.log('watching...');

      gulp.watch(config.path.images,    ['images']);
      gulp.watch(config.path.fonts,     ['fonts']);
      gulp.watch(config.path.configs,   ['config']);
      gulp.watch(config.path.views,     ['views']);


      gulp.watch(config.path.styles, function watch(event) {
        return toPromise(stylesTask()).then(function finish() {
          return toPromise(viewsTask());
        });
      });
      
      gulp.watch(config.path.scripts, function watch(event) {
        return toPromise(scriptsTask()).then(function finish() {
          return toPromise(viewsTask());
        });
      });
  });
});

gulp.task('default', ['watch']);