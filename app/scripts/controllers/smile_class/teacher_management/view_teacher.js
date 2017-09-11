'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_teacher', function ($scope, $http, $sce) {
    $scope.isTeacherSelect = false;
    $scope.isSelected2 = false;
    $scope.tea_names_select = "";
    $scope.teacher_name_table = "";

    $(document).ready(function () {
        $scope.learn_class_table = $("#learn_class_table").DataTable({});
        $scope.teacherAcc = $("#teacherAcc").DataTable({});
        $scope.teacherAcc2 = $("#teacherAcc2").DataTable();
    });

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/teacher'
        }).then(function successCallback(response) {
            $scope.tea_names_select = response.data.result;
            $scope.selected = response.data.result[0].teaId;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };

	$scope.dateFormatter = function(inputdate){
		var date = new Date(inputdate);
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +   date.getDate();
	};
	
    $scope.submit = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/teacher/' + $scope.selected
        }).then(function successCallback(response) {
            $scope.isTeacherSelect = true;
            $scope.teacher_personaldata = response.data;
            //loard classes
            $http({
                method: 'GET',
                url: 'http://localhost:8084/SmileClass/studyClass-byTID/' + $scope.selected
            }).then(function successCallback(response1) {
                $scope.learn_class_table.destroy();
                $('#learn_class_table_body').empty();
                var i = 0;
                for (i = 0; i < response1.data.result.length; i++) {
                    $("#learn_class_table_body").append("<tr><td>"
                            + response1.data.result[i].clsId + "</td><td>"
                            + response1.data.result[i].clsName + "</td><td>"
                            + response1.data.result[i].clsFee + "</td><td>"
                            + response1.data.result[i].subId.subName + "</td><td>"
                            + response1.data.result[i].clsTypeId.clsTypeName + "</td></tr>");
                }
                $scope.learn_class_table = $("#learn_class_table").DataTable();
                $("#learn_class_table").show();
            }, function errorCallback(response) {
                swal('Error!','Something Wrong!','error');
            });

            //teacher-account
            $http({
                method: 'GET',
                url: 'http://localhost:8084/SmileClass/teacher_account_details/' + $scope.selected
            }).then(function successCallback(response) {
                $scope.classess = response.data.result;
                $scope.teacherAcc.destroy();
                $('#teacherTableBody').empty();
                var i = 0;
                $scope.t_creditBal = 0;
                $scope.t_debitBal = 0;
                $scope.t_forwordBal = 0;
                for (i = 0; i < response.data.result.length; i++) {
                    $scope.type = response.data.result[i].teaAccBalType;
                    if ($scope.type == "credit") {
                        $("#teacherTableBody").append("<tr><td>"
								+ i +"</td><td>"
                                + $scope.dateFormatter(response.data.result[i].teaAccStateChgDate) + "</td><td>"
                                + response.data.result[i].teaAccDes + "</td><td>"
                                + response.data.result[i].teaAccAmount + "</td><td>"
                                + "" + "</td></tr>");
                        $scope.t_creditBal = $scope.t_creditBal + response.data.result[i].teaAccAmount;
                    } else {
                        $("#teacherTableBody").append("<tr><td>"
								+ i +"</td><td>"
                                + $scope.dateFormatter(response.data.result[i].teaAccStateChgDate) + "</td><td>"
                                + response.data.result[i].teaAccDes + "</td><td>"
                                + "" + "</td><td>"
                                + response.data.result[i].teaAccAmount + "</td></tr>");
                        $scope.t_debitBal = $scope.t_debitBal + response.data.result[i].teaAccAmount;
                    }
                }
                $scope.t_forwordBal = $scope.t_creditBal - $scope.t_debitBal

                $("#teacherTableBody").append("<tr><td><b>"
						+ (i+1) +"</b></td><td><b>"
                        + $scope.dateFormatter(response.data.result[response.data.result.length - 1].teaAccStateChgDate) + "</b></td><td><b>"
                        + 'Total' + "</b></td><td><b>"
                        + $scope.t_creditBal + "</b></td><td><b>"
                        + $scope.t_debitBal + "</b></td></tr>");

                if ($scope.t_forwordBal >= 0) {
                    $("#teacherTableBody").append("<tr><td><b>"
							+ (i+2) +"</b></td><td><b>"
                            + $scope.dateFormatter(response.data.result[response.data.result.length - 1].teaAccStateChgDate) + "</b></td><td><b>"
                            + 'Forward Balance ' + "</b></td><td><b>"
                            + $scope.t_forwordBal + "</b></td><td><b>"
                            + "" + "</b></td></tr>");
                    $scope.balance_type1 = "Payable Amount";

                } else {
                    $("#teacherTableBody").append("<tr><td><b>"
							+ (i+2) +"</b></td><td><b>"
                            + $scope.dateFormatter(response.data.result[response.data.result.length - 1].teaAccStateChgDate) + "</b></td><td><b>"
                            + 'Forward Balance' + "</b></td><td><b>"
                            + "" + "</b></td><td><b>"
                            + ($scope.t_forwordBal * -1) + "</b></td></tr>");
                    $scope.balance_type1 = "Receivable Amount";

                }
                $scope.teacherAcc = $("#teacherAcc").DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'excel',
                        {
                            extend: 'print',
                            text: 'Print selected',
                            title: 'Sahas Educational Institute - Pay Sheet',
                            message: 'This pay sheet is genarated for ' + $scope.teacher_personaldata.teaName,
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
                            title: 'Sahas Educational Institute - Pay Sheet',
                            message: 'This pay sheet is genarated for ' + $scope.teacher_personaldata.teaName,
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
                $("#teacherAcc").show();
            }, function errorCallback(response) {
                swal('Error!','Something Wrong!','error');
            });

        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };

    $scope.paysheet = function () {
        $scope.isSelected2 = true;
        var date = $scope.start_date;
        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();
        var startDateString = year + "-" + monthIndex + "-" + day;
        var date2 = $scope.end_date;
        var day2 = date2.getDate();
        var monthIndex2 = date2.getMonth() + 1;
        var year2 = date2.getFullYear();
        var endDateString = year2 + "-" + monthIndex2 + "-" + day2;
        //PaySheet-account
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/teacher-paysheet',
            data: {
                "start_day": startDateString,
                "end_day": endDateString,
                "teacher_id": $scope.selected
            }
        }).then(function successCallback(response) {
            $scope.teacherAcc2.destroy();
            $('#teacherTableBody2').empty();
            var i = 0;
            $scope.t_creditBal2 = 0;
            $scope.t_debitBal2 = 0;
            $scope.t_forwordBal2 = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $scope.type = response.data.result[i].teaAccBalType;
                if ($scope.type == "credit") {
                    $("#teacherTableBody2").append("<tr><td>"
							+ i +"</td><td>"
                            + $scope.dateFormatter(response.data.result[i].teaAccStateChgDate) + "</td><td>"
                            + response.data.result[i].teaAccDes + "</td><td>"
                            + response.data.result[i].teaAccAmount + "</td><td>"
                            + "" + "</td></tr>");

                    $scope.t_creditBal2 = $scope.t_creditBal2 + response.data.result[i].teaAccAmount;
                } else {
                    $("#teacherTableBody2").append("<tr><td>"
							+ i +"</td><td>"
                            + $scope.dateFormatter(response.data.result[i].teaAccStateChgDate) + "</td><td>"
                            + response.data.result[i].teaAccDes + "</td><td>"
                            + "" + "</td><td >"
                            + response.data.result[i].teaAccAmount + "</td></tr>");
                    $scope.t_debitBal2 = $scope.t_debitBal2 + response.data.result[i].teaAccAmount;
                }
            }

            $scope.t_forwordBal2 = $scope.t_creditBal2 - $scope.t_debitBal2;
            $("#teacherTableBody2").append("<tr><td><b>"
					+ (i+1) +"</b></td><td><b>"
                    + $scope.dateFormatter(endDateString) + "</b></td><td><b>"
                    + 'Total' + "</b></td><td><b>"
                    + $scope.t_creditBal2 + "</b></td><td><b>"
                    + $scope.t_debitBal2 + "</b></td></tr>");

            if ($scope.t_forwordBal2 >= 0) {
                $("#teacherTableBody2").append("<tr><td><b>"
						+ (i+2) +"</b></td><td><b>"
                        + $scope.dateFormatter(endDateString) + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + $scope.t_forwordBal2 + "</b></td><td><b>"
                        + "" + "</b></td></tr>");
                $scope.balance_type2 = "Payable Amount";

            } else {
                $("#teacherTableBody2").append("<tr><td><b>"
						+ (i+2) +"</b></td><td><b>"
                        + $scope.dateFormatter(endDateString) + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + "" + "</b></td><td><b>"
                        + ($scope.t_forwordBal2 * -1) + "</b></td></tr>");
                $scope.balance_type2 = "Receivable Amount";

            }

            $scope.teacherAcc2 = $("#teacherAcc2").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel',
                    {
                        extend: 'print',
                        text: 'Print selected',
                        title: 'Sahas Educational Institute - Pay Sheet',
                        message: 'This pay sheet is genarated for ' + $scope.teacher_personaldata.teaName + ' Period - from ' + startDateString + ' to ' + endDateString + '.\n\n',
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
                        title: 'Sahas Educational Institute - Pay Sheet',
                        message: 'This pay sheet is genarated for ' + $scope.teacher_personaldata.teaName + ' Period - from ' + startDateString + ' to ' + endDateString + '.\n\n',
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
            $("#teacherAcc2").show();
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
});