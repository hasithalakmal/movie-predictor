'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_subject', function ($scope, $http) {

    $scope.subject_names_select = "";
    $scope.formsinglesublitControleFlag = false;
	$scope.subjectname = "";

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

    $scope.validationOptions = {
        rules: {
            subjectname: {
                required: true,
            }
        },
        messages: {
            subjectname: {
                required: "Please Enter Subject Name",
            }
        }
    };

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/subject',
                    data: {
                        "subName": $scope.subjectname,
                        "recordAdded": 1
                    }
                }).then(function successCallback(response) {
                    $scope.subjectname = "";
                    swal("Success!", "Subject is Successfully Registered!", "success");
                    $scope.formsinglesublitControleFlag = false;
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });
            }
        }
    };
});