angular.module('components.github', [])
  
  .constant('GithubConfig', {

    BASE_URL: 'https://api.github.com/',
    USERNAME: 'yrezgui',
    REPOSITORY_NAME: 'ionic-rocket'
  })

  .factory('Github', ['$http', 'GithubConfig', function Github($http, GithubConfig) {

    function getLastCommits(sha) {
      var url = GithubConfig.BASE_URL + 'repos/' + GithubConfig.USERNAME + '/' + GithubConfig.REPOSITORY_NAME + '/commits';

      var xhr = $http({
        method: 'GET',
        url: url,
        params: {
          sha: sha
        }
      });

      return xhr.then(function process(xhr) {

        if(xhr.data.length === 1) {
          if(xhr.data[0].sha === sha) {
            return [];
          }
        }

        return xhr.data;
      });
    }

    return {
      getLastCommits: getLastCommits
    };
  }]);
