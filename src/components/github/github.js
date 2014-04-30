angular.module('components.github', [])
  
  .constant('GithubConfig', {

    BASE_URL: 'https://api.github.com/',
    USERNAME: 'yrezgui',
    REPOSITORY_NAME: 'ionic-rocket'
  })

  .factory('Github', ['$http', 'GithubConfig', function Github($http, GithubConfig) {

    function getLastCommits(sha, since, until) {
      var url = GithubConfig.BASE_URL + GithubConfig.USERNAME + '/' + GithubConfig.REPOSITORY_NAME + '/commits';

      return $http({
        method: 'JSONP',
        url: url,
        params: {
          sha: sha,
          since: since,
          until: until
        }
      });
    }

    return {
      getLastCommits: getLastCommits
    };
  }]);
