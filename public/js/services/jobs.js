angular.module('jobService', [])
  // each function returns a promise object
  .factory('Jobs', ['$http', function ($http) {
    return {
      get: function () {
        return $http.get('api/jobs');
      },
      create: function (jobData) {
        return $http.post('api/jobs', jobData);
      },
      delete: function (id) {
        return $http.delete('api/jobs/' + id);
      }
    }
  }])
