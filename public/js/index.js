// controller for the position table
// fires GET request to /showAll
var app = angular.module('index_show_all_positions', []);
app.controller('index_all_positions', function ($scope, $http) {
  $scope.requestData = function () {
    $http({
      method: 'GET',
      url: 'showAll'
    }).then(function Success(response) {
      console.log(response);
      $scope.positions = response.data;
    }, function Error(response) {
      console.log(response);
    });
  };

  $scope.requestData();
  // refresh every 10 seconds
  setInterval($scope.requestData, 10000);
});


// controller for the search result panel
// fires GET request to /instrument/xxxxx
var app_x = angular.module('index_show_search', []);
app_x.controller('index_show_submit', function ($scope, $http) {
  $scope.findPosition = function () {
    $http({
      method: 'GET',
      url: 'instrument/' + $scope.input_instrument_id
    }).then(function Success(response) {
      console.log(response);
      // clears the input box if instrument id is found, else not
      $scope.input_instrument_id = '';
      $scope.custom_data = response.data[0];
    }, function Error(response) {
      console.log(response);
      // incase user enters invalid/non-existent instrument-id
      // window.location.href = 'http://localhost:9090/404';
      $scope.custom_data = {};
      $scope.custom_data.instrument_id = 'Not Available';
      $scope.custom_data.position = 'Not Available';
    });
  };
});

angular.bootstrap(document.getElementById("show_all"), ['index_show_all_positions']);

var socket = io.connect('http://localhost:9090');

socket.on('connect', function () {
  var x_id = Math.ceil(Math.random() * 1000000);
  socket.send('New User Connected. Id: ' + x_id);
});

socket.on('message', function (push_msg) {
  console.log(push_msg);
})