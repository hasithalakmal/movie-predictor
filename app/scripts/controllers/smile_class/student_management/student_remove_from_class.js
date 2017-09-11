'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('student_remove_from_class', function ($scope, $http) {
	$scope.isStudentSelect = false;
    $scope.formsinglesublitControleFlag1 = false;
    $scope.formsinglesublitControleFlag2 = false;
	$scope.selectClass = false;
	
	$scope.validationOptions = {
        rules: {
            addmision_number: {
                required: true,
                number: true,
                min: 1
            }
        },
        messages: {
            addmision_number: {
                required: "Please Enter Student Registration Number",
                number: "Your Registration Number must be in the format of 111",
                min: "Can Not Enter Negative Numbers"
            }
        }
    };
	$scope.submit1 = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag1) {
                $scope.formsinglesublitControleFlag1 = true;
                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
                }).then(function successCallback(response) {
                    if (response.data.result) {
						console.log("aaaaa");
                        //load classes
                        $http({
                            method: 'GET',
                            url: 'http://localhost:8084/SmileClass/student-all-learn-classes/' + $scope.addmision_number
                        }).then(function successCallback(response3) {
                            $scope.learn_classes_select = response3.data.result;
                            $scope.selected = response3.data.result[0].lid;
							$scope.selectClass = true;
							$scope.formsinglesublitControleFlag1 = false;
                        }, function errorCallback(response) {
                            swal('Error!', 'Something Wrong!', 'error');
							$scope.formsinglesublitControleFlag1 = false;
                        });
                    } else {
                        swal('Error!', 'Student Registration Number is Not Exist', 'error');
						$scope.formsinglesublitControleFlag1 = false;
                    }
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
					$scope.formsinglesublitControleFlag1 = false;
                });
            }
        }
    };
	
	$scope.submit2 = function(){
		if (!$scope.formsinglesublitControleFlag2) {
                $scope.formsinglesublitControleFlag2 = true;
				console.log("LID === "+$scope.selected);
				$http({
                            method: 'DELETE',
                            url: 'http://localhost:8084/SmileClass/student-learn-class/' + $scope.selected
                        }).then(function successCallback(response3) {
							$scope.addmision_number = null;
							$scope.selectClass = false;
							swal('Success!', 'Student Removed From Class!', 'success');
							$scope.formsinglesublitControleFlag2 = false;
                        }, function errorCallback(response) {
                            swal('Error!', 'Something Wrong!', 'error');
							$scope.formsinglesublitControleFlag2 = false;
                        });
			}
	};
	
});