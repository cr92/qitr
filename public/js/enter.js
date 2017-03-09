// controller for trade string entry page
// fires POST request to /enter
var app = angular.module('enter_trade_data', []);
app.controller('post_trade_data', function ($scope, $http) {
    $scope.postTradeData = function () {
        var data_xhr = {
            data_string: $scope.order_string
        };
        $http({
            method: 'POST',
            url: 'enter',
            data: data_xhr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function Success(response) {
            console.log(response);
            // if string processed & inserted successfully
            // shows success message in frontend
            // clears the input box
            $scope.order_string = '';
            $scope.isSuccess = true;
            $scope.positions = response.data;
        }, function Error(response) {
            console.log(response);
            // if string pricessing fails, success panel gets closed
            $scope.isSuccess = false;
        });
    };
});