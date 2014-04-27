angular.module('states.tabs.commits', [])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('tabs.commits', {
      url: '/commits',
      views: {
        'tab-commits': {
          templateUrl: 'app/tabs/commits/commits.html',
          controller: 'CommitsCtrl'
        }
      }
    });
  }])


  .controller('CommitsCtrl', ['$scope', function CommitsCtrl($scope) {

    console.log('Commits controller loaded', $scope);
  }]);
