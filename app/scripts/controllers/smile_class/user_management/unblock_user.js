'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('unblock_user', function ($scope, $http) {

    $scope.subject_names_select = "";
	$scope.formsinglesublitControleFlag = false;

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/subject'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.selected = response.data.result[0].subId;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };

    $scope.submit = function () {
	if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
				$http({
					method: 'DELETE',
					url: 'http://localhost:8084/SmileClass/subject/' + $scope.selected
				}).then(function successCallback(response) {
					swal('Success!','Subject is successfully deleted!','success');
					$scope.init();
					$scope.formsinglesublitControleFlag = false;
				}, function errorCallback(response) {
					swal('Can not Delete!','This Data is used in another Programme!','error');
					$scope.formsinglesublitControleFlag = false;
				});
		}
    };
});