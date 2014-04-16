module.exports = function(mod) {

  mod.controller('RootCtrl', ['$scope', function($scope) {

    $scope.onControllerChanged = function(oldController, oldIndex, newController, newIndex) {
      console.log('Controller changed', oldController, oldIndex, newController, newIndex);
      console.log(arguments);
    };
  }]);
};
