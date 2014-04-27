angular.module('states.tabs.about', [])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('tabs.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'app/tabs/about/about.html',
          controller: 'AboutCtrl'
        }
      }
    });
  }])


  .controller('AboutCtrl', ['$scope', function AboutCtrl($scope) {

    console.log('About controller loaded', $scope);
  }]);
