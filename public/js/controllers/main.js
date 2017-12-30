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

    // Requirement item
    $scope.ReqItems = [
      {
        nameSkill: null,
        experienceSkill: null,
      }
    ];
    // Add new requiremet item to form
    $scope.addReqItem = function () {
      $scope.ReqItems.push({});
    }

    // Delete the item requirement from the form
    $scope.removeReqItem = function (index) {
      $scope.ReqItems.splice(index, 1);
    }

    // CREATE
    // when submittin the add form, send the JOB to the node API
    $scope.createJob = function () {
      // validate the formData to make sure that something is there
      // if no data, nothing will happen (TODO: show a message with the error)
      if($scope.formData.name != undefined && $scope.formData.city != undefined){

        // add the requirements list to the formData
        // TODO: improve better solution using only the formData
        $scope.formData.qualifications = $scope.ReqItems;

        console.log($scope.formData);

        // call the create function from our service (returns a promise object)
        Jobs.create($scope.formData)

          // if successful creation, call our get function to get all the new Jobs
          .success(function(data) {

            // clear the form so our user is ready to enter another
            $scope.formData = {};
            $scope.jobs = data; // assign our new list of todos
          });
      }
    }
  }]);
