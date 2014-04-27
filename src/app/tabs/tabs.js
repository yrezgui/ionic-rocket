angular.module('states.tabs', [
  'states.tabs.home',
  'states.tabs.commits',
  'states.tabs.about'
])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('tabs', {
      abstract: true,
      templateUrl: 'app/tabs/tabs.html'
    });
  }]);