var mod = module.exports = angular.module('states.tabs.home', []);

mod.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('tabs.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'states/tabs/home/home.html',
        controller: 'HomeCtrl'
      }
    }
  });
}]);


mod.controller('HomeCtrl', ['$ionicNavBarDelegate', function HomeCtrl($ionicNavBarDelegate) {

  $ionicNavBarDelegate.setTitle('Ionic Rocket');
}]);
