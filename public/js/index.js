    var app = angular.module('myApp', []);
    app.controller('myCtrl', function ($scope, $http) {
      $http({
        method: "GET",
        url: "showAll"
      }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
      }, function myError(response) {
        $scope.myWelcome = response.statusText;
      });
    });