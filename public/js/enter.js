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
        }).then(function Succes(response) {
            console.log(response);
            $scope.order_string = '';
            $scope.isSuccess = true;
            $scope.positions = response.data;
        }, function Error(response) {
            console.log(response);
            $scope.isSuccess = false;
            $scope.all_data = response.statusText;
        });
    };
});