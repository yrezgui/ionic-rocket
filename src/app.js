angular.module('rocketApp', [
  'ngTouch',
  'ngAnimate',
  'ngSanitize',
  'ionic',
  'components.github',
  'app.tabs'
])

  .config(['$compileProvider', '$urlRouterProvider', '$stateProvider', function config($compileProvider, $urlRouterProvider, $stateProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|tel|sms):/);

    $urlRouterProvider.otherwise('/home');
  }]);