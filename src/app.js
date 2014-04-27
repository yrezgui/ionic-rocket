window.$ = window.jQuery = require('jquery');
require('ionic');
require('angular');
require('angular-sanitize');
require('angular-animate');
require('angular-touch');
require('angular-ui-router');
require('ionic-angular');

window._ = require('lodash');

var dependencies = [
  //require('./components'),
  require('./states')
];

var deps = ['ngTouch', 'ngAnimate', 'ngSanitize', 'ionic'];
deps.concat(_.pluck(dependencies, 'name'));

var mod = module.exports = angular.module('rocketApp', deps);

mod.config(['$compileProvider', '$urlRouterProvider', function config($compileProvider, $urlRouterProvider) {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|tel|sms):/);
  $urlRouterProvider.otherwise('/home');
}]);