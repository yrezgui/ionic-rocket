angular.module('app.tabs.commits', ['components.github'])

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


  .controller('CommitsCtrl', ['$scope', 'Github', function CommitsCtrl($scope, Github) {

    console.log('Commits controller loaded', $scope);

    $scope.lastSha              = null;
    $scope.commits              = [];
    $scope.noMoreItemsAvailable = false;
    
    $scope.getCommits = function getCommits(noUiUpdate) {

      Github.getLastCommits($scope.lastSha).then(function success(results) {

        if(results.length) {
          $scope.commits = _.uniq($scope.commits.concat(results), function uniq(commit) {
            return commit.sha;
          });

          $scope.lastSha = results[results.length - 1].sha;
        } else {
          $scope.noMoreItemsAvailable = true;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.getCommits();
  }]);
