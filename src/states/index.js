var dependencies = [
  require('./tabs')
];

var deps = _.pluck(dependencies, 'name');

var mod = module.exports = angular.module('app.states', deps);

mod.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('tabs', {
    abstract: true,
    templateUrl: 'states/tabs/tabs.html'
  });
}]);