'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('update_class_type', function ($scope, $http) {
    $scope.subject_names_select = "";
    $scope.grade_select = "";
	$scope.grade = "";
	$scope.formsinglesublitControleFlag1 = false;
	$scope.formsinglesublitControleFlag2 = false;
	
	$scope.validationOptions = {
        rules: {
            grade: {
                required: true,
            }
        },
        messages: {
            grade: {
                required: "Please Select Grade Name",
            }
        }
    };

    $scope.init = function () {
		$scope.subject_names_select = "";
		$scope.grade_select = "";
		$scope.grade = "";
		$scope.formsinglesublitControleFlag1 = false;
		$scope.formsinglesublitControleFlag2 = false;
		$scope.update_stste = true;
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

    //update selection function
    $scope.submit1 = function () {
		if (!$scope.formsinglesublitControleFlag1) {
				$scope.update_stste = false;
				$http({
					method: 'GET',
					url: 'http://localhost:8084/SmileClass/class-type/' + $scope.selected
				}).then(function successCallback(response) {
					$scope.grade = response.data.clsTypeName;
					$scope.formsinglesublitControleFlag1 = false;
					$scope.formsinglesublitControleFlag1 = true;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag1 = false;
				});
				$http({
					method: 'GET',
					url: 'http://localhost:8084/SmileClass/class-type'
				}).then(function successCallback(response) {
					$scope.grade_select2 = response.data.result;
					$scope.selected2 = response.data.result[0].clsTypeId;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
				});
		}
    };

    //update subject function
    $scope.submit2 = function (form) {
        if (form.validate()) {
			if (!$scope.formsinglesublitControleFlag2) {
                $scope.formsinglesublitControleFlag2 = true;
				var i =0;
				for(i=0;i<$scope.grade_select2.length;i++){
					if($scope.grade_select2[i].clsTypeId == $scope.selected2){
						$scope.mappedGradeName = $scope.grade_select2[i].clsTypeName;
					}
					
				}
				
				$http({
					method: 'PUT',
					url: 'http://localhost:8084/SmileClass/class-type',
					data: {
						"clsTypeId": $scope.selected,
						"mappingClassTypeId": $scope.selected2,
						"mappedClassTypeName": $scope.mappedGradeName,
						"clsTypeName": $scope.grade
					}
				}).then(function successCallback(response) {
					$scope.grade = "";
					$scope.init();
					swal("Success!", "Grade is Successfully Updated!", "success");
					$scope.formsinglesublitControleFlag2 = false;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag2 = false;
				});
			}
        }
        ;
    };
});