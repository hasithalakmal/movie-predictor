'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('other_payment', function ($scope, $http) {
    //define variables

    $scope.submit = function () {
        $scope.object = {
            "Amount": $scope.ammount,
            "otherexpense": $scope.Description
        };
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/otherExpense',
            data: $scope.object
        }).then(function successCallback(response) {
			$scope.ammount = null;
			$scope.Description = null;
            swal("Success!", "Other Payments are Successfully Updated", "success");
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
});