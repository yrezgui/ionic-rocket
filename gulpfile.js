var config      = require('./config.js');
var gulp        = require('gulp');
var clean       = require('gulp-clean');
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var es          = require('event-stream');
var path        = require('path');
var Q           = require('q');
var runSequence = require('run-sequence');
var _           = require('lodash');

var assetsMap = {};

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
    var file = data.path.split(data.base)[1];

    if(assetsMap[type].indexOf(file) === -1) {
      assetsMap[type].push(file);
    }

    return data;
  });
}

gulp.task('clean', function cleanTask() {
  return gulp.src(config.path.build, {read: false})
             .pipe(clean());
});

gulp.task('config', function configTask() {
  return gulp.src(config.path.configs)
             .pipe(gulp.dest(config.path.build));
});

gulp.task('scripts', function scriptsTask() {
  return es.concat(
    gulp.src(config.path.scripts).pipe(updateAssetsMap('scripts')),
    gulp.src(config.scripts.dependencies).pipe(changeFolder('deps')).pipe(updateAssetsMap('dependencies'))

  ).pipe(gulp.dest(config.path.build));
});

gulp.task('fonts', function fontsTask() {
  return es.concat(
    gulp.src(config.path.fonts),
    gulp.src(config.externalFiles.fonts)

  ).pipe(gulp.dest(path.join(config.path.build, 'fonts')));
});

gulp.task('images', function imagesTask() {
  return gulp.src(config.path.images)
             .pipe(gulp.dest(path.join(config.path.build, 'img')));
});

gulp.task('styles', function stylesTask() {
  return es.concat(
    gulp.src(config.path.styles).pipe(sass()),
    gulp.src(config.externalFiles.styles)

  ).pipe(changeFolder('css')).pipe(updateAssetsMap('styles')).pipe(gulp.dest(path.join(config.path.build)));
});


function processViews() {
  return gulp.src('src/**/*.jade')
             .pipe(jade({pretty: true, locals: {assets: assetsMap}}))
             .pipe(gulp.dest(config.path.build));
}

gulp.task('views', function viewsTask(callback) {

  if(_.isEmpty(assetsMap)) {
    runSequence(['scripts', 'styles'], function finish() {

      processViews().on('end', callback);
    });
  } else {
    processViews().on('end', callback);
  }
});

gulp.task('build', function buildTask(callback) {
  return runSequence(
    'clean',
    ['config', 'scripts', 'fonts', 'images', 'styles'],
    'views',
    callback
  );
});

gulp.task('watch', ['build'], function watchTask(callback){

  console.log('watching...');

  gulp.watch(config.path.images,    ['images']);
  gulp.watch(config.path.fonts,     ['fonts']);
  gulp.watch(config.path.configs,   ['config']);
  gulp.watch(config.path.views,     ['views']);

  gulp.watch(config.path.styles, function watchStyles(event) {
    return runSequence('styles', 'views');
  });

  gulp.watch(config.path.scripts, function watchScripts(event) {
    return runSequence('scripts', 'views');
  });
});

gulp.task('default', ['watch']);