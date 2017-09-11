'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('attendance', function ($scope, $http, ngAudio) {
    $scope.isStudentSelect = false;
	$scope.cantdesideClass = false;
    $scope.formsinglesublitControleFlag = false;
    $scope.formsinglesublitControleFlag2 = false;
    $scope.audio = ngAudio.load('audio/alarm2.mp3');

    $scope.validationOptions = {
        rules: {
            addmision_number: {
                required: true,
                number: true
            }
        },
        messages: {
            addmision_number: {
                required: "Please Enter Student Registration Number",
                number: "Your Registration Number must be in the format of 111"
            }
        }
    };

    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable({});
    });

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.study_class_select = response.data.result;
            $scope.selected = response.data.result[0].clsId;
        }, function errorCallback(response) {
            swal('Error!', 'Something Wrong!', 'error');
        });
    };
	
    $scope.submit1 = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
				$scope.isStudentSelect = false;
                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
                }).then(function successCallback(response) {
                    if (response.data.result) {
                        $http({
                            method: 'GET',
                            url: 'http://localhost:8084/SmileClass/attendance-automate/' + $scope.addmision_number
                        }).then(function successCallback(response) {
                            if (response.data.length == 0) {
                                swal('Error!', 'Student Do Not have Class Today.', 'error');
								$scope.formsinglesublitControleFlag = false;
                            } else if (response.data.length == 1) {
                                $scope.selected = response.data[0].clsId;
								 $scope.markAttendence();
                            } else {
                                $scope.study_class_select = response.data;
                                $scope.selected = response.data[0].clsId;
								$scope.cantdesideClass = true;
                            }
                            

                        }, function errorCallback(response) {
                            swal('Error!', 'Student Registration Number is Not Exist', 'error');
                            $scope.formsinglesublitControleFlag = false;
                        });

                    } else {
                        swal('Error!', 'Student Registration Number is Not Exist', 'error');
                        $scope.formsinglesublitControleFlag = false;
                    }

                }, function errorCallback(response) {
                    swal('Error!', 'Somthing went wrong', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });
            }
        }
    };

    $scope.submit2 = function () {
        if (!$scope.formsinglesublitControleFlag2) {
            $scope.formsinglesublitControleFlag2 = true;
            $scope.markAttendence();
        }
    };



    $scope.markAttendence = function () {
		$scope.cantdesideClass = false;
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/attendance',
            data: {
                "addmision_number": $scope.addmision_number,
                "class_id": $scope.selected
            }
        }).then(function successCallback(response) {
            var state = response.data.msg;
			console.log(">>>>>>>>>>>" +state);
            if (state == 'not_learn') {
                swal('Not Learn', 'Student not learn in this class', 'error');
            } else if (state == 'have_to_pay') {
                swal('Have to pay', 'Mark Attendence, and you have to pay fees', 'warning');
            } else if (state == 'should_pay') {
                swal({
                    title: "Can't Attend to Class!!!",
                    text: "You will not be able attend class without Teacher's authorization!",
                    type: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Authorization",
                    cancelButtonText: "Skip Attendance",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                        function (isConfirm) {
                            if (isConfirm) {
                                swal({
                                    title: "Authorization Code",
                                    text: "Enter serial number of chit issued by class teacher.",
                                    type: "input",
                                    showCancelButton: true,
                                    closeOnConfirm: false,
                                    animation: "slide-from-top",
                                    inputPlaceholder: "Authorization Code"
                                },
                                        function (inputValue) {
                                            if (inputValue === false)
                                                return false;
                                            if (inputValue === "") {
                                                swal.showInputError("You need to write something!");
                                                return false
                                            }
                                            swal("Mark Attendance", "We Marked Attendance, You Should pay fees on next day.", "warning");
                                        });

                            } else {
                                swal("Cancelled", "Attendance is not marked. Just skipped", "error");
                            }
                        });
                $scope.audio.play();
            } else if (state == 'welcome') {
                swal('Success', 'Mark Attendence, and welcome to the class', 'success');
            } else if (state == 'alredy_marked') {
                swal('Error!', 'Already Marked Error', 'warning');
            } else if (state == 'aries') {
                swal('Error!', 'First You Should Pay Aries', 'error');
				$scope.audio.play();
            }else if (state == 'aries_marked') {
                swal('Error!', 'First You Should Pay Aries. Attendence is Already Marked.', 'error');
				$scope.audio.play();
            }else if (state == 'problem') {
                swal('Error!', 'Some Technical Error', 'error');
            }else {
                swal('Error!', 'Something Wrong!', 'error');
            }

            $http({
                method: 'GET',
                url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
            }).then(function successCallback(response) {
                $scope.classess = response.data.result;
				$scope.previousAries = response.data.aries;
                $scope.stusertable.destroy();
                $('#stuSerchTableBody').empty();
                var i = 0;
                $scope.creditBal = 0;
                for (i = 0; i < response.data.result.length; i++) {
                    var payablemonth = response.data.result[i].stuAccPaybleMonth;
                    var payablemonthText = "";
                    switch (payablemonth) {
                                    case 1:
                                        payablemonthText = "January";
                                        break;
                                    case 2:
                                        payablemonthText = "February";
                                        break;
                                    case 3:
                                        payablemonthText = "March";
                                        break;
                                    case 4:
                                        payablemonthText = "April";
                                        break;
                                    case 5:
                                        payablemonthText = "May";
                                        break;
                                    case 6:
                                        payablemonthText = "June";
                                        break;
                                    case 7:
                                        payablemonthText = "July";
                                        break;
                                    case 8:
                                        payablemonthText = "August";
                                        break;
                                    case 9:
                                        payablemonthText = "September";
                                        break;
                                    case 10:
                                        payablemonthText = "October";
                                        break;
                                    case 11:
                                        payablemonthText = "November";
                                        break;
                                    case 12:
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
                            + response.data.result[i].stuAccAmount + "</td></tr>");
                    $scope.creditBal = $scope.creditBal + response.data.result[i].stuAccAmount;
                }
                $scope.stusertable = $("#StudentSearchResultByName").DataTable({});
                $("#studentSearchingTable").show();
				$scope.isStudentSelect = true;
                $scope.formsinglesublitControleFlag2 = false;
				$scope.formsinglesublitControleFlag = false;
            }, function errorCallback(response) {
                swal('Error!', 'Something Wrong!', 'error');
                $scope.formsinglesublitControleFlag2 = false;
				$scope.formsinglesublitControleFlag = false;
            });
            $scope.addmision_number = '';
        }, function errorCallback(response) {
            swal('Error!', 'Something Wrong!', 'error');
        });
    };

});