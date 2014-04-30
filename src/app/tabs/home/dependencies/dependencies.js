angular.module('app.tabs.home.dependencies', [])
  
  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('tabs.home.dependencies', {
      url: '/dependencies',
      views: {
        'tab-home@tabs': {
          templateUrl: 'app/tabs/home/dependencies/dependencies.html',
          controller: 'DependenciesCtrl'
        }
      }
    });
  }])

  .controller('DependenciesCtrl', ['$scope', function DependenciesCtrl($scope) {

    console.log('Dependencies controller loaded', $scope);
  }]);
