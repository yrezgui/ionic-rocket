var mod = module.exports = angular.module('states.tabs.about', []);

mod.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('tabs.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'states/tabs/about/about.html',
        controller: 'AboutCtrl'
      }
    }
  });
}]);


mod.controller('AboutCtrl', ['$ionicNavBarDelegate', function AboutCtrl($ionicNavBarDelegate) {

  $ionicNavBarDelegate.setTitle('About the project');
}]);
