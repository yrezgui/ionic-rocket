angular.module('app.tabs.author', [])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('tabs.author', {
      url: '/author',
      views: {
        'tab-author': {
          templateUrl: 'app/tabs/author/author.html',
          controller: 'AuthorCtrl'
        }
      }
    });
  }])


  .controller('AuthorCtrl', ['$scope', function AuthorCtrl($scope) {

    console.log('Author controller loaded', $scope);
  }]);
