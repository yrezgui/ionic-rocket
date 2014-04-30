angular.module('app.tabs', [
  'app.tabs.home',
  'app.tabs.commits',
  'app.tabs.author'
])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('tabs', {
      abstract: true,
      templateUrl: 'app/tabs/tabs.html'
    });
  }]);