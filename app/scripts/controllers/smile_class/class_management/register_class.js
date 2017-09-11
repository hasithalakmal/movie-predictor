'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_class', function ($scope, $http) {
    $scope.formsinglesublitControleFlag = false;
    $scope.teacher_names_select = "";
	$scope.cls_name = "";
		
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
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/teacher'
        }).then(function successCallback(response) {
            $scope.teacher_names_select = response.data.result;
            $scope.teaId = response.data.result[0].teaId;
        }, function errorCallback(response) {
            swal('Error!', 'Something Wrong!', 'error');
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/subject'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.subId = response.data.result[0].subId;
        }, function errorCallback(response) {
            swal('Error!', 'Something Wrong!', 'error');
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.class_type_names_select = response.data.result;
            $scope.clsTypeId = response.data.result[0].clsTypeId;
        }, function errorCallback(response) {
            swal('Error!', 'Something Wrong!', 'error');
        });

        $scope.clsDay = "Sunday";
    };

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;

                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/studyClass',
                    data: {
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
                    swal("Success!", "Class is Successfully Registered!", "success");
                    $scope.formsinglesublitControleFlag = false;
                }, function errorCallback(response) {
                    swal('error!', 'something wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });
            }
        }
        ;
    };
});