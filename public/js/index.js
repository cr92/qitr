var app = angular.module('index_show_all_positions', []);
app.controller('index_all_positions', function ($scope, $http) {
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


var app_x = angular.module('index_show_search', []);
app_x.controller('index_show_submit', function ($scope, $http) {
  $scope.findPosition = function () {
    $http({
      method: 'GET',
      url: 'instrument/' + $scope.input_instrument_id
    }).then(function Succes(response) {
      console.log(response);
      $scope.input_instrument_id = '';
      $scope.custom_data = response.data[0];
    }, function Error(response) {
      console.log(response);
      $scope.all_data = response.statusText;
    });
  };

});

angular.bootstrap(document.getElementById("show_all"), ['index_show_all_positions']);