'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('delete_class', function ($scope, $http) {
	$scope.formsinglesublitControleFlag = false;
    $scope.cls_names_select = "";
    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.cls_names_select = response.data.result;
            $scope.selected = response.data.result[0].clsId;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };

    $scope.submit = function () {
	if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
				$http({
					method: 'DELETE',
					url: 'http://localhost:8084/SmileClass/studyClass/' + $scope.selected
				}).then(function successCallback(response) {
					swal('Success!','Class is Successfully Deleted!','success');
					$scope.init();
					$scope.formsinglesublitControleFlag = false;
				}, function errorCallback(response) {
					swal('Can not Delete!','This Data is used in another Programme!','error');
					$scope.formsinglesublitControleFlag = false;
				});
		}
    };
});