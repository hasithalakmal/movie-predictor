'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_students_in_class', function ($scope, $http, $sce) {
	$scope.formsinglesublitControleFlag = false;
    $scope.cls_names_select = "";
    $(document).ready(function () {
        $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
    });

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
	
	$scope.submit = function(){
		if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
				$http({
					method: 'GET',
					url: 'http://localhost:8084/SmileClass/class-all-students/' + $scope.selected
				}).then(function successCallback(response) {
					$scope.stusertable.destroy();
					$('#allStuSerchTableBody').empty();
					var i = 0;
					for (i = 0; i < response.data.result.length; i++) {
						$("#allStuSerchTableBody").append("<tr><td>" + response.data.result[i].student.stuId + "</td><td>"
								+ response.data.result[i].student.stuName + "</td><td>"
								+ response.data.result[i].student.stuGrade + "</td><td>"
								+ response.data.result[i].student.stuSchool + "</td><td>"
								+ response.data.result[i].student.guarName + "</td><td>"
								+ response.data.result[i].student.stuPhone1 + "</td><td>"
								/* 	+response.data.result[i].stuPhone2 + "</td><td>" 
								 +response.data.result[i].stuPhone3 + "</td><td>"  */
								+ response.data.result[i].learnFee + "</td></tr>");
					}
					$scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
					$("#subjectSearchingTable").show();
					$scope.studentdetails = true;
					$scope.formsinglesublitControleFlag = false;
				}, function errorCallback(response) {
					swal('Can not Delete!','This Data is used in another Programme!','error');
					$scope.formsinglesublitControleFlag = false;
				});
		}
    };

});