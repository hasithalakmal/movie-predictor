'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('remove_student_from_class', function ($scope, $http, $sce) {
    $scope.validationOptions = {
        rules: {
            addmision_number: {
                required: true
            }
        },
        messages: {
            addmision_number: {
                required: "Please Enter Student Registration Number. This is required."
            }
        },
    };
    $scope.isStudentSelect = false;
    $(document).ready(function () {
        $scope.learn_class_table = $("#learn_class_table").DataTable();
        $scope.stusertable = $("#StudentSearchResultByName").DataTable();
        $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable();
    });

    $scope.submit = function (form) {
        if (form.validate()) {

            // Simple GET request example:
            $http({
                method: 'GET',
                url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
            }).then(function successCallback(response) {
                if (response.data.result) {
                    $scope.isStudentSelect = true;
                    //personal details
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8084/SmileClass/student/' + $scope.addmision_number
                    }).then(function successCallback(response) {
                        $scope.student_personaldata = response.data;
                    }, function errorCallback(response) {
                        swal('Error!','Something Wrong!','error');
                    });

                    //need to pay fees
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
                    }).then(function successCallback(response) {
                        $scope.classess = response.data.result;
                        $scope.stusertable.destroy();
                        $('#stuSerchTableBody').empty();
                        var i = 0;
                        $scope.st_Bal = 0;
                        for (i = 0; i < response.data.result.length; i++) {
                            var payablemonth = response.data.result[i].stuAccPaybleMonth;
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

                            $("#stuSerchTableBody").append("<tr><td>"
                                    + response.data.result[i].stuAccTid + "</td><td>"
                                    + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                    + payablemonthText + "</td><td>"
                                    + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                    + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                    + response.data.result[i].lid.learnFee + "</td></tr>");

                            $scope.st_Bal = $scope.st_Bal + response.data.result[i].lid.learnFee;
                        }
                        $scope.stusertable = $("#StudentSearchResultByName").DataTable();
                        $("#studentSearchingTable").show();
                        $scope.isStudentSelect = true;
                    }, function errorCallback(response) {
                        swal('Error!','Something Wrong!','error');
                    });

                    $http({
                        method: 'GET',
                        url: 'http://localhost:8084/SmileClass/fees-history/' + $scope.addmision_number
                    }).then(function successCallback(response2) {
                        $scope.classess2 = response2.data.result;
                        $scope.stusertable2.destroy();
                        $('#stuSerchTableBody2').empty();
                        var i = 0;
                        for (i = 0; i < response2.data.result.length; i++) {
                            $("#stuSerchTableBody2").append("<tr><td>"
                                    + response2.data.result[i].stuAccTid + "</td><td>"
                                    + response2.data.result[i].stuAccPaybleYear + "</td><td>"
                                    + response2.data.result[i].stuAccPaybleMonth + "</td><td>"
                                    + response2.data.result[i].lid.studyClass.clsName + "</td><td>"
                                    + response2.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                    + response2.data.result[i].stuAccPaidDate + "</td><td>"
                                    + response2.data.result[i].lid.learnFee + "</td></tr>");
                        }
                        $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable();
                        $("#StudentSearchResultByName2").show();
                    }, function errorCallback(response) {
                        swal('Error!','Something Wrong!','error');
                    });

                    //Learn Class table
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8084/SmileClass/student-all-learn-classes/' + $scope.addmision_number
                    }).then(function successCallback(response1) {
                        $scope.classess = response1.data.result;
                        $scope.learn_class_table.destroy();
                        $('#learn_class_table_body').empty();
                        var i = 0;
                        for (i = 0; i < response1.data.result.length; i++) {
                            $("#learn_class_table_body").append("<tr><td>"
                                    + response1.data.result[i].studyClass.clsName + "</td><td>"
                                    + response1.data.result[i].studyClass.subId.subName + "</td><td>"
                                    + response1.data.result[i].studyClass.clsTypeId.clsTypeName + "</td><td>"
                                    + response1.data.result[i].studyClass.teaId.teaName + "</td><td>"
                                    + response1.data.result[i].learnFee + "</td></tr>");
                        }

                        //to run data table
                        $scope.learn_class_table = $("#learn_class_table").DataTable();
                        $("#learn_class_table").show();

                    }, function errorCallback(response) {
                        swal('Error!','Something Wrong!','error');
                    });
                } else {
                    swal('Error!','Student Registration Number is Not Exist!','error');
                }
            }, function errorCallback(response) {
                swal('Error!','Something Wrong!','error');
            });
        }
    };
});