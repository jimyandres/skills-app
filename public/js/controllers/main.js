angular.module('jobController', [])
  // inject the Job service factory into the controller
  .controller('mainController', ['$scope', '$http', 'Jobs', function ($scope, $http, Jobs) {
    $scope.formData = {};

    // GET
    // when landing on the page, get all the Jobs and show them
    // use the service to get all the Jobs
    Jobs.get()
      .success(function(data) {
        $scope.jobs = data;
      });
  }]);
