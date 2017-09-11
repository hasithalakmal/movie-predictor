'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_free_card_students', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
		$scope.stusertable2 = $("#AllStudentTypeSearchResultByName2").DataTable();
    });

    $scope.init = function () {
		$scope.study_class_select = "";
		$scope.isStudentSelect = false;
		$http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.study_class_select = response.data.result;
            $scope.selected = response.data.result[0].clsId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-all-freecard-students'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#allStuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#allStuSerchTableBody").append("<tr><td>" + response.data.result[i].student.stuId + "</td><td>"
                        + response.data.result[i].student.stuName + "</td><td>"
						+ response.data.result[i].student.stuGrade + "</td><td>"
                        + response.data.result[i].student.stuSchool + "</td><td>"
                        + response.data.result[i].stuPhone1 + "</td><td>"
                        + response.data.result[i].studyClass.clsName + "</td><td>"
                        /* 	+response.data.result[i].stuPhone2 + "</td><td>" 
                         +response.data.result[i].stuPhone3 + "</td><td>"  */
                        + response.data.result[i].learnFee + "</td></tr>");
            }
            $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
            $("#subjectSearchingTable").show();
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
	
	$scope.submit = function () {
         $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-all-freecard-students/'+ $scope.selected
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable2.destroy();
            $('#allStuSerchTableBody2').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#allStuSerchTableBody2").append("<tr><td>" + response.data.result[i].student.stuId + "</td><td>"
                        + response.data.result[i].student.stuName + "</td><td>"
						+ response.data.result[i].student.stuGrade + "</td><td>"
                        + response.data.result[i].student.stuSchool + "</td><td>"
                        + response.data.result[i].stuPhone1 + "</td><td>"
                        + response.data.result[i].studyClass.clsName + "</td><td>"
                        /* 	+response.data.result[i].stuPhone2 + "</td><td>" 
                         +response.data.result[i].stuPhone3 + "</td><td>"  */
                        + response.data.result[i].learnFee + "</td></tr>");
            }
            $scope.stusertable2 = $("#AllStudentTypeSearchResultByName2").DataTable();
            $("#subjectSearchingTable2").show();
			$scope.isStudentSelect = true;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
});