var app = angular.module('index_show_all_positions', []);
app.controller('index_all_positions', function ($scope, $http, $timeout) {
  $scope.requestData = function () {
    $http({
      method: 'GET',
      url: 'showAll'
    }).then(function Succes(response) {
      console.log(response);
      $scope.positions = response.data;
    }, function Error(response) {
      console.log(response);
      $scope.all_data = response.statusText;
    });
  };

  $scope.requestData();
  setInterval($scope.requestData, 10000);
});
