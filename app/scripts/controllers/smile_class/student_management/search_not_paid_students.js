'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('search_not_paid_students', function ($scope, $http, $sce) {
    $scope.isStudentSelect = false;
    $(document).ready(function () {
        $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
        $scope.stusertable2 = $("#AllStudentTypeSearchResultByName2").DataTable();
		$scope.stusertable3 = $("#AllStudentTypeSearchResultByName3").DataTable();
    });
    $scope.study_class_select = "";
    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.study_class_select = response.data.result;
            $scope.selected = response.data.result[0].clsId;
			$scope.selected2 = response.data.result[0].clsId;
			$scope.selectedMonth = 1;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });

        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/not-paid-students'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#allStuSerchTableBody').empty();
            var i = 0;
            $scope.creditBal = 0;
            for (i = 0; i < response.data.result.length; i++) {
                var payablemonth = response.data.result[i].payable_month;
                var payablemonthText = "";
                switch (payablemonth) {
                    case '1':
                        payablemonthText = "January";
                        break;
                    case '2':
                        payablemonthText = "February";
                        break;
                    case '3':
                        payablemonthText = "March";
                        break;
                    case '4':
                        payablemonthText = "April";
                        break;
                    case '5':
                        payablemonthText = "May";
                        break;
                    case '6':
                        payablemonthText = "June";
                        break;
                    case '7':
                        payablemonthText = "July";
                        break;
                    case '8':
                        payablemonthText = "August";
                        break;
                    case '9':
                        payablemonthText = "September";
                        break;
                    case '10':
                        payablemonthText = "October";
                        break;
                    case '11':
                        payablemonthText = "November";
                        break;
                    case '12':
                        payablemonthText = "December";
                        break;
                    default:
                        payablemonthText = "Undefinded";

                }
                $("#allStuSerchTableBody").append("<tr><td>"
                        + response.data.result[i].stuID + "</td><td>"
                        + response.data.result[i].sname + "</td><td>"
                        + response.data.result[i].phone + "</td><td>"
                        + response.data.result[i].class_name + "</td><td>"
                        + response.data.result[i].teacher_name + "</td><td>"
                        + response.data.result[i].payable_year + "</td><td>"
                        + payablemonthText + "</td><td>"
                        + response.data.result[i].class_fees + "</td></tr>");
                $scope.creditBal = $scope.creditBal + response.data.result[i].class_fees;
            }

            //to run data table
            $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
            $("#subjectSearchingTable").show();
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };

    $scope.submit = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/not-paid-students/' + $scope.selected
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable2.destroy();
            $('#allStuSerchTableBody2').empty();
            var i = 0;
            $scope.creditBal = 0;
            for (i = 0; i < response.data.result.length; i++) {
                var payablemonth = response.data.result[i].payable_month;
                var payablemonthText = "";
                switch (payablemonth) {
                    case '1':
                        payablemonthText = "January";
                        break;
                    case '2':
                        payablemonthText = "February";
                        break;
                    case '3':
                        payablemonthText = "March";
                        break;
                    case '4':
                        payablemonthText = "April";
                        break;
                    case '5':
                        payablemonthText = "May";
                        break;
                    case '6':
                        payablemonthText = "June";
                        break;
                    case '7':
                        payablemonthText = "July";
                        break;
                    case '8':
                        payablemonthText = "August";
                        break;
                    case '9':
                        payablemonthText = "September";
                        break;
                    case '10':
                        payablemonthText = "October";
                        break;
                    case '11':
                        payablemonthText = "November";
                        break;
                    case '12':
                        payablemonthText = "December";
                        break;
                    default:
                        payablemonthText = "Undefinded";

                }
                $("#allStuSerchTableBody2").append("<tr><td>"
                        + response.data.result[i].stuID + "</td><td>"
                        + response.data.result[i].sname + "</td><td>"
                        + response.data.result[i].phone + "</td><td>"
                        /* +response.data.result[i].class_name + "</td><td>"  */
                        + response.data.result[i].teacher_name + "</td><td>"
                        + response.data.result[i].payable_year + "</td><td>"
                        + payablemonthText + "</td><td>"
                        + response.data.result[i].class_fees + "</td></tr>");
                $scope.creditBal = $scope.creditBal + response.data.result[i].class_fees;

            }

            //to run data table
            $scope.stusertable2 = $("#AllStudentTypeSearchResultByName2").DataTable();
            $("#subjectSearchingTable2").show();
            $scope.isStudentSelect = true;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };
	
	$scope.submit2 = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/not-paid-students/' + $scope.selected2
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable3.destroy();
            $('#allStuSerchTableBody3').empty();
            var i = 0;
            $scope.creditBal3 = 0;
            for (i = 0; i < response.data.result.length; i++) {
                var payablemonth = response.data.result[i].payable_month;
				if(payablemonth==$scope.selectedMonth){
				
					var payablemonthText = "";
                switch (payablemonth) {
                    case '1':
                        payablemonthText = "January";
                        break;
                    case '2':
                        payablemonthText = "February";
                        break;
                    case '3':
                        payablemonthText = "March";
                        break;
                    case '4':
                        payablemonthText = "April";
                        break;
                    case '5':
                        payablemonthText = "May";
                        break;
                    case '6':
                        payablemonthText = "June";
                        break;
                    case '7':
                        payablemonthText = "July";
                        break;
                    case '8':
                        payablemonthText = "August";
                        break;
                    case '9':
                        payablemonthText = "September";
                        break;
                    case '10':
                        payablemonthText = "October";
                        break;
                    case '11':
                        payablemonthText = "November";
                        break;
                    case '12':
                        payablemonthText = "December";
                        break;
                    default:
                        payablemonthText = "Undefinded";

                }
                $("#allStuSerchTableBody3").append("<tr><td>"
                        + response.data.result[i].stuID + "</td><td>"
                        + response.data.result[i].sname + "</td><td>"
                        + response.data.result[i].phone + "</td><td>"
                        /* +response.data.result[i].class_name + "</td><td>"  */
                        + response.data.result[i].teacher_name + "</td><td>"
                        + response.data.result[i].payable_year + "</td><td>"
                        + payablemonthText + "</td><td>"
                        + response.data.result[i].class_fees + "</td></tr>");
                $scope.creditBal3 = $scope.creditBal3 + response.data.result[i].class_fees;
				}else{
				
				}
            }

            //to run data table
            $scope.stusertable3 = $("#AllStudentTypeSearchResultByName3").DataTable();
            $("#subjectSearchingTable3").show();
            $scope.isStudentSelect2 = true;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });
    };
});