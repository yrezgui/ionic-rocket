window.$ = window.jQuery = require('jquery');
//window.Modernizr = require('modernizr');
require('ionic');
require('angular');
require('angular-sanitize');
require('angular-animate');
require('angular-touch');
require('angular-ui-router');
require('ionic-angular');

window._ = require('lodash');

var modules = [
  //require('./services'),
  //require('./filters'),
  require('./controllers')
  //require('./directives')
];

var dependencies = _.pluck(modules, 'name');
dependencies.push('ngTouch', 'ngAnimate', 'ngSanitize', 'ionic');

var govhub = module.exports = angular.module('rocketApp', dependencies);

govhub.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeCtrl'
      });

    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise('/home');
  }
]);