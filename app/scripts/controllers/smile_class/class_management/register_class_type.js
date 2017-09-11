'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_class_type', function ($scope, $http) {
    $scope.formsinglesublitControleFlag = false;
	$scope.grade = "";

    $scope.validationOptions = {
        rules: {
            grade: {
                required: true,
            }
        },
        messages: {
            grade: {
                required: "Please Enter Student Grade",
            }
        }
    };

	$scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.grade_select = response.data.result;
            $scope.selected = response.data.result[0].clsTypeId;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
    
    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
				var i =0;
				for(i=0;i<$scope.grade_select.length;i++){
					if($scope.grade_select[i].clsTypeId == $scope.selected){
						$scope.mappedGradeName = $scope.grade_select[i].clsTypeName;
					}
					
				}
                $scope.formsinglesublitControleFlag = true;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/class-type',
                    data: {
                        "clsTypeName": $scope.grade,
						"mappingClassTypeId": $scope.selected,
						"mappedClassTypeName": $scope.mappedGradeName,
                        "recodeState": 1,
                    }
                }).then(function successCallback(response) {
                    $scope.grade = "";
                    swal("Success!", "Grade is Successfully Registered!", "success");
                    $scope.formsinglesublitControleFlag = false;
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });
            }
        }
        ;
    };
});