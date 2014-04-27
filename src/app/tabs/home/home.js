angular.module('states.tabs.home', [
  'states.tabs.home.dependencies'
])
  
  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('tabs.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'app/tabs/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }])

  .controller('HomeCtrl', ['$scope', function HomeCtrl($scope) {

    console.log('Home controller loaded', $scope);
  }]);
