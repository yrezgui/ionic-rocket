var config = module.exports = {};

config.externalFiles = {
  styles: [
    './vendor/ionic/release/css/ionic.css'
  ],
  scripts: [],
  views: [],
  images: [],
  fonts: [
    './vendor/ionic/release/fonts/**/*'
  ]
};

config.path = {
  build:      './www',
  styles:     ['./src/**/*.scss'],
  scripts:    ['./src/**/*.js'],
  views:      ['./src/**/*.jade'],
  fonts:      ['./src/fonts/**/*'],
  images:     ['./src/images/**/*'],
  configs:    ['./src/config/**/*']
};

config.scripts = {
  dependencies: [
    'vendor/jquery/dist/jquery.js',
    'vendor/lodash/dist/lodash.js',
    'vendor/angular/angular.js',
    'vendor/angular-animate/angular-animate.js',
    'vendor/angular-sanitize/angular-sanitize.js',
    'vendor/angular-touch/angular-touch.js',
    'vendor/ionic/release/js/ionic.js',
    'vendor/ionic/release/js/ionic-angular.js',
    'vendor/angular-ui-router/release/angular-ui-router.js'
  ]
};