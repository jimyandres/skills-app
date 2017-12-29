angular.module('jobService', [])
  // each function returns a promise object
  .factory('Jobs', ['$http', function ($http) {
    return {
      get: function () {
        return $http.get('api/jobs');
      },
    }
  }])