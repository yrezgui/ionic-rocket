var config      = require('./config.js');
var gulp        = require('gulp');
var clean       = require('gulp-clean');
var browserify  = require('gulp-browserify');
var jade        = require('gulp-jade');
var less        = require('gulp-less');
var es          = require('event-stream');

gulp.task('clean', function(){
  return gulp.src(config.path.build, {read: false})
             .pipe(clean());
});

gulp.task('config', function() {
  return gulp.src(config.path.configs)
             .pipe(gulp.dest(config.path.build));
});

gulp.task('resources', function() {
  return gulp.src(config.path.resources)
             .pipe(gulp.dest(path.join(config.path.build, 'res')));
});

gulp.task('scripts', function() {
  // Single entry point to browserify
  return gulp.src('src/scripts/app.js')
             .pipe(browserify({
                insertGlobals : true,
                debug : true
             }))
             .pipe(gulp.dest(path.join(config.path.build, 'js')));
});

gulp.task('fonts', function() {
  return es.concat(
    gulp.src(config.path.fonts),
    gulp.src(config.externalFiles.fonts)

  ).pipe(gulp.dest(path.join(config.path.build, 'fonts')));
});

gulp.task('images', function() {
  return gulp.src(config.path.images)
             .pipe(gulp.dest(path.join(config.path.build, 'img')));
});

gulp.task('styles', function(){
  return es.concat(
    gulp.src('src/styles/app.less').pipe(less()),
    gulp.src(config.externalFiles.styles)

  ).pipe(gulp.dest(path.join(config.path.build, 'css')));
});

gulp.task('views', function(){
  return gulp.src(['src/views/templates/**/*.jade'])
             .pipe(jade())
             .pipe(gulp.dest(path.join(config.path.build, 'tpl')));
});

gulp.task('index', function(){
  return gulp.src('src/views/index.jade')
             .pipe(jade())
             .pipe(gulp.dest(config.path.build));
});

gulp.task('watch', ['clean'], function(){

  gulp.run('scripts', 'styles', 'views', 'index', 'images', 'fonts', 'resources', 'config',
    function watch() {

      gulp.watch(config.path.styles,  ['styles']);
      gulp.watch(config.path.scripts, ['scripts']);
      gulp.watch(config.path.images,  ['images']);
      gulp.watch(config.path.fonts,   ['fonts']);
      gulp.watch(config.path.configs, ['config']);
      gulp.watch(config.path.views,   ['views', 'index']);
    },
    function initialTasks() {
      console.log('watching...');
    }
  );
});