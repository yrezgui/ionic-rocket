var dependencies = [
  require('./home'),
  require('./about')
];

var deps = _.pluck(dependencies, 'name');

var mod = module.exports = angular.module('states.tabs', deps);

mod.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('tabs', {
    abstract: true,
    templateUrl: 'states/tabs/tabs.html'
  });
}]);