var app = angular.module('enter_trade_data', []);
app.controller('post_trade_data', function ($scope, $http) {
    var datax = {
        data_string: '1473997674.817611 : 8=FIX.4.2|35=8|39=2|44=1340|48=54552|38=1000|151=0|32=1000|31=1340|11=110000072|37=1100000000081761|40=0|17=16673431|6=19644600|14=0|54=2|55=CIPLA|20=0|150=2|60=20160916-03:47:54|10=000|'
    };
    $http({
        method: 'POST',
        url: 'enter',
        data: datax,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function Succes(response) {
        console.log(response);
        $scope.positions = response.data;
    }, function Error(response) {
        console.log(response);
        $scope.all_data = response.statusText;
    });
});