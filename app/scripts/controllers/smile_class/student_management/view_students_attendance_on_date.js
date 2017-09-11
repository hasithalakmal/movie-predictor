'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_students_attendance_on_date', function ($scope, $http, $sce) {

    $scope.isSelected = false;
	
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
	
    $(document).ready(function () {
        $scope.cashacc = $("#CashAccountSearchResultByName").DataTable();
		$scope.cashacc2 = $("#CashAccountSearchResultByName2").DataTable();
        $scope.Profitacc = $("#ProfitAcc").DataTable();
    });

	
	$scope.dateFormatter = function(inputdate){
		var date = new Date(inputdate);
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +   date.getDate();
	};

    $scope.submit = function () {
        var date = $scope.reportDate;
        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();
        var dateString = year + "-" + monthIndex + "-" + day;
        $scope.data = {
            "attDate": dateString,
			"clzID":$scope.selected
        };
		$scope.attendenceDate = dateString;

        // Attendence Account
        $http({
            method: 'POST',
			data : $scope.data,
            url: 'http://localhost:8084/SmileClass/attendence-on-date'
        }).then(function successCallback(response) {
            $scope.isSelected = true;
            $scope.classess = response.data.result;
            $scope.cashacc.destroy();
            $('#cashSerchTableBody').empty();
            var i = 0;
            $scope.t_creditBal2 = 0;
            $scope.t_debitBal2 = 0;
            $scope.t_forwordBal2 = 0;
            for (i = 0; i < response.data.result.length; i++) {
                    $("#cashSerchTableBody").append("<tr><td>" + response.data.result[i].student.stuId + "</td><td>"
                        + response.data.result[i].student.stuName + "</td></tr>");
						/* + response.data.result[i].student.stuGrade + "</td><td>"
                        + response.data.result[i].student.stuSchool + "</td><td>"
                        + response.data.result[i].stuPhone1 + "</td><td>"
                        + response.data.result[i].studyClass.clsName + "</td><td>" */
                        /* 	+response.data.result[i].stuPhone2 + "</td><td>" 
                         +response.data.result[i].stuPhone3 + "</td><td>"  */
/*                         + response.data.result[i].learnFee + "</td></tr>"); */
               
            }
            

            $scope.cashacc = $("#CashAccountSearchResultByName").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel',
                    {
                        extend: 'print',
                        text: 'Print Selected',
                        title: 'Sahas Educational Institute - Attendence Report',
                        message: 'This attendence report is genarated for ' + $scope.attendenceDate + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        },
                        exportOptions: {
                            modifier: {
                                selected: true
                            }
                        }


                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        title: 'Sahas Educational Institute - Attendence Report',
                        message: 'This attendence report is genarated for ' + $scope.attendenceDate + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        }
                    }
                ],
                select: true
            });
            $("#CashAccountSearchResultByName").show();
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
		
		//absents
		$http({
            method: 'POST',
			data : $scope.data,
            url: 'http://localhost:8084/SmileClass/absents-on-date'
        }).then(function successCallback(response) {
            $scope.isSelected = true;
            $scope.classess = response.data.result;
            $scope.cashacc2.destroy();
            $('#cashSerchTableBody2').empty();
            var i = 0;
            $scope.t_creditBal2 = 0;
            $scope.t_debitBal2 = 0;
            $scope.t_forwordBal2 = 0;
            for (i = 0; i < response.data.result.length; i++) {
                    $("#cashSerchTableBody2").append("<tr><td>" + response.data.result[i].student.stuId + "</td><td>"
                        + response.data.result[i].student.stuName + "</td></tr>");
						/* + response.data.result[i].student.stuGrade + "</td><td>"
                        + response.data.result[i].student.stuSchool + "</td><td>"
                        + response.data.result[i].stuPhone1 + "</td><td>"
                        + response.data.result[i].studyClass.clsName + "</td><td>"*/
                        /* 	+response.data.result[i].stuPhone2 + "</td><td>" 
                         +response.data.result[i].stuPhone3 + "</td><td>"  */
                      //  + response.data.result[i].learnFee + "</td></tr>"); 
               
            }
            

            $scope.cashacc2 = $("#CashAccountSearchResultByName2").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel',
                    {
                        extend: 'print',
                        text: 'Print Selected',
                        title: 'Sahas Educational Institute - Absent Report',
                        message: 'This daily report is genarated on ' + $scope.attendenceDate + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        },
                        exportOptions: {
                            modifier: {
                                selected: true
                            }
                        }


                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        title: 'Sahas Educational Institute - Absent Report',
                        message: 'This absent report is genarated on ' + $scope.attendenceDate + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        }
                    }
                ],
                select: true
            });
            $("#CashAccountSearchResultByName2").show();
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });

       
    };
});