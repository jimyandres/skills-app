angular.module('locationService', [])
  // each function returns a promise object
  .factory('Locations', ['$http', function ($http) {
    return {
      getCities: function () {
        return $http.get('api/cities');
      },
      getCountries: function () {
        return $http.get('api/countries');
      }
    }
  }])
