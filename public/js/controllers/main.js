angular.module('jobController', [])
  // inject the Job service factory into the controller
  .controller('mainController', ['$scope', '$http', 'Jobs', 'Skills', 'Locations', function ($scope, $http, Jobs, Skills, Locations) {
    $scope.formData = {};

    // 'Requirement' item
    $scope.ReqItems = [{}];
    // Add new requiremet item to form
    $scope.addReqItem = function () {
      $scope.ReqItems.splice(0,0,{});
    }
    // Delete the item requirement from the form
    $scope.removeReqItem = function (index) {
      console.log($scope.ReqItems.length);
      if ($scope.ReqItems.length > 1)
        $scope.ReqItems.splice(index, 1);
    }

    // GET ---------------------------------------------------------------------

    // JOBS
    // when landing on the page, get all the Jobs and show them
    // use the service to get all the Jobs
    Jobs.get()
      .success(function(data) {
        $scope.jobs = data;
      });

    // SKILLS
    // when landing on the page, get all the Skills
    function getSkills() {
      Skills.get()
        .success(function (data) {
          $scope.skills = data;
        })

      // when landing on the page, get the count Skills (demand)
      Skills.getDemand()
        .success(function (data) {
          $scope.skillsDemand = data;
        })
    }
    getSkills();

    // LOCATIONS
    // when landing on the page, get all the cities and countries
    function getLocations() {
      Locations.getCities()
        .success(function (data) {
          $scope.cities = data;
        })

      // when landing on the page, get the count Skills (demand)
      Locations.getCountries()
        .success(function (data) {
          $scope.countries = data;
        })
    }
    getLocations();

    // CREATE ------------------------------------------------------------------
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
            $scope.ReqItems = [{}];
            $scope.jobs = data; // assign our new list of todos
          });
        getSkills();
        getLocations();
      }
    };

    // DELETE ------------------------------------------------------------------
    // delete a Job
    $scope.removeJob = function (id) {
      Jobs.delete(id)

      // if success deletion, call our get function to get all the Jobs
      .success(function (data) {

        // assign our stored jobs
        $scope.jobs = data;
      })
      getSkills();
      getLocations();
    };
  }]);
