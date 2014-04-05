var config = module.exports = {};

config.externalFiles = {
  styles: [
    'vendor/ionic/release/css/ionic.css'
  ],
  scripts: [],
  views: [],
  images: [],
  fonts: [
    'vendor/ionic/release/fonts/ionicons.eot',
    'vendor/ionic/release/fonts/ionicons.svg',
    'vendor/ionic/release/fonts/ionicons.ttf',
    'vendor/ionic/release/fonts/ionicons.woff'
  ]
};

config.path = {
  build:      'www',
  styles:     ['src/styles/**/*.less'],
  scripts:    ['src/scripts/**/*.js'],
  views:      ['src/views/**/*.jade'],
  fonts:      ['src/fonts/**/*'],
  images:     ['src/images/**/*'],
  resources:  ['src/resources/**/*'],
  configs:    ['src/config/**/*']
};