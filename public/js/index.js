var app = angular.module('index_show_all_positions', []);
app.controller('index_all_positions', function ($scope, $http) {
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
});