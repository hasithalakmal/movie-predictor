'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('update_class', function ($scope, $http) {
    $scope.class_names_select = "";
	$scope.subjectname1 = "";
	$scope.formsinglesublitControleFlag1 = false;
	$scope.formsinglesublitControleFlag2 = false;

	$scope.validationOptions = {
        rules: {
            cls_name: {
                required: true
            },
            cls_fees: {
                required: true
            },
            percentage: {
                required: true
            }

        },
        messages: {
            cls_name: {
                required: "Please Enter Class Name. This is required."
            },
            cls_fees: {
                required: "Please Enter Class Fees. This is required."
            },
            percentage: {
                required: "Please Enter Percentage. This is required."
            }

        },
    };
	
    $scope.init = function () {
		$scope.class_names_select = "";
		$scope.cls_name = "";
		$scope.formsinglesublitControleFlag1 = false;
		$scope.formsinglesublitControleFlag2 = false;
		$scope.update_stste = true;
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.class_names_select = response.data.result;
            $scope.selected = response.data.result[0].clsId;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    }

    //update selection function
    $scope.submit1 = function () {
		if (!$scope.formsinglesublitControleFlag1) {
                $scope.formsinglesublitControleFlag1 = true;
				$http({
					method: 'GET',
					url: 'http://localhost:8084/SmileClass/studyClass/' + $scope.selected
				}).then(function successCallback(response) {
					$scope.cls_name = response.data.clsName;
					$scope.cls_fees = response.data.clsFee;
					$scope.percentage = response.data.percentage;
					$scope.clsDay = response.data.clsDay;
					
					$http({
						method: 'GET',
						url: 'http://localhost:8084/SmileClass/teacher'
					}).then(function successCallback(response1) {
						$scope.teacher_names_select = response1.data.result;
						$scope.teaId = response.data.teaId.teaId;
					}, function errorCallback(response) {
						swal('Error!', 'Something Wrong!', 'error');
					});

					$http({
						method: 'GET',
						url: 'http://localhost:8084/SmileClass/subject'
					}).then(function successCallback(response1) {
						$scope.subject_names_select = response1.data.result;
						$scope.subId = response.data.subId.subId;
					}, function errorCallback(response) {
						swal('Error!', 'Something Wrong!', 'error');
					});

					$http({
						method: 'GET',
						url: 'http://localhost:8084/SmileClass/class-type'
					}).then(function successCallback(response1) {
						$scope.class_type_names_select = response1.data.result;
						$scope.clsTypeId = response.data.clsTypeId.clsTypeId;
					}, function errorCallback(response) {
						swal('Error!', 'Something Wrong!', 'error');
					});
					
					$scope.formsinglesublitControleFlag1 = false;
					$scope.update_stste = false;
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
                $scope.formsinglesublitControleFlag2 = true;
				$http({
					method: 'PUT',
					url: 'http://localhost:8084/SmileClass/studyClass',
					data:  {
						"clsId":$scope.selected,
                        "subId": $scope.subId,
                        "payPeriod": "monthly",
                        "percentage": $scope.percentage,
                        "clsName": $scope.cls_name,
                        "clsTypeId": $scope.clsTypeId,
                       // "clsTimePerod": $scope.cls_stime + $scope.cls_etime,
                        "clsDay": $scope.clsDay,
                        "teaId": $scope.teaId,
                        "clsFee": $scope.cls_fees
                    }
				}).then(function successCallback(response) {
					 $scope.cls_name = "";
                    $scope.percentage = "";
                    $scope.cls_fees = "";
                   // $scope.cls_stime = "";
					$scope.init();
					swal("Success!", "Class is Successfully Updated!", "success");
					$scope.formsinglesublitControleFlag2 = false;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag2 = false;
				});
			}
        }
    };
});