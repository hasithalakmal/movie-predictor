'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('update_subject', function ($scope, $http) {
    $scope.subject_names_select = "";
	$scope.subjectname1 = "";
	$scope.formsinglesublitControleFlag1 = false;
	$scope.formsinglesublitControleFlag2 = false;

	$scope.validationOptions = {
        rules: {
            subjectname1: {
                required: true,
            }
        },
        messages: {
            subjectname1: {
                required: "Please Select Subject Name",
            }
        }
    };
	
    $scope.init = function () {
		$scope.subject_names_select = "";
		$scope.subjectname1 = "";
		$scope.formsinglesublitControleFlag1 = false;
		$scope.formsinglesublitControleFlag2 = false;
		$scope.update_stste = true;
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/subject'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.selected = response.data.result[0].subId;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    }

    //update selection function
    $scope.submit1 = function () {
		if (!$scope.formsinglesublitControleFlag1) {
                $scope.formsinglesublitControleFlag1 = true;
				$scope.update_stste = false;
				$http({
					method: 'GET',
					url: 'http://localhost:8084/SmileClass/subject/' + $scope.selected
				}).then(function successCallback(response) {
					$scope.subjectname1 = response.data.subName;
					$scope.formsinglesublitControleFlag1 = false;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag1 = false;
				});
		}
    };

	//update function
    $scope.submit2 = function (form) {
        if (form.validate()) {
			if (!$scope.formsinglesublitControleFlag2) {
				$http({
					method: 'PUT',
					url: 'http://localhost:8084/SmileClass/subject',
					data: {
						"subId": $scope.selected,
						"subName": $scope.subjectname1
					}
				}).then(function successCallback(response) {
					$scope.subjectname1 = "";
					$scope.init();
					swal("Success!", "Subject is Successfully Updated!", "success");
					$scope.formsinglesublitControleFlag2 = false;
					$scope.formsinglesublitControleFlag2 = true;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag2 = false;
				});
			}
        }
    };
});