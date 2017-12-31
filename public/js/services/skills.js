angular.module('skillService', [])
  // each function returns a promise object
  .factory('Skills', ['$http', function ($http) {
    return {
      get: function () {
        return $http.get('api/skills');
      },
      getDemand: function () {
        return $http.get('api/skills/demand');
      }
    }
  }])
