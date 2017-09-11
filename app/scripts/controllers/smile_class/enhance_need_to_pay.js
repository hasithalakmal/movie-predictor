'use strict';
/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('enhance_need_to_pay', function ($scope, $http, $q) {
    $scope.isStudentSelect = false;
    $scope.formsinglesublitControleFlag1 = false;
    $scope.formsinglesublitControleFlag2 = false;
    $scope.validationOptions = {
        rules: {
            addmision_number: {
                required: true,
                number: true,
                min: 1
            }
        },
        messages: {
            addmision_number: {
                required: "Please Enter Student Registration Number",
                number: "Your Registration Number must be in the format of 111",
                min: "Can Not Enter Negative Numbers"
            }
        }
    };
    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable({
            columnDefs: [{
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 0
                }],
            select: {
                style: 'os',
                selector: 'td:first-child'
            },
            order: [[1, 'asc']]
        });
        $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
    });
    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag1) {
                $scope.formsinglesublitControleFlag1 = true;
                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
                }).then(function successCallback(response) {
                    if (response.data.result) {
                        $http({
                            method: 'GET',
                            url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
                        }).then(function successCallback(response) {
                            $scope.classess = response.data.result;
                            $scope.stusertable.destroy();
                            $('#stuSerchTableBody').empty();
                            var i = 0;
                            $scope.creditBal = 0;
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

                                $("#stuSerchTableBody").append("<tr><td></td><td>"
                                        + response.data.result[i].stuAccTid + "</td><td>"
                                        + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                        + payablemonthText + "</td><td>"
                                        + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                        + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                        + response.data.result[i].lid.learnFee + "</td></tr>");
                                $scope.creditBal = $scope.creditBal + response.data.result[i].lid.learnFee;
                            }
                            $scope.stusertable = $("#StudentSearchResultByName").DataTable({
                                columnDefs: [{
                                        orderable: false,
                                        className: 'select-checkbox',
                                        targets: 0
                                    }],
                                select: {
                                    style: 'multi',
                                    selector: 'td:first-child'
                                },
                                order: [[1, 'asc']]
                            });
                            $("#studentSearchingTable").show();
                            $scope.isStudentSelect = true;
                            $scope.formsinglesublitControleFlag1 = false;
                        }, function errorCallback(response) {
                            swal('Error!', 'Something Wrong!', 'error');
                            $scope.formsinglesublitControleFlag1 = false;
                        });
                        //payment history
                        $http({
                            method: 'GET',
                            url: 'http://localhost:8084/SmileClass/fees-history/' + $scope.addmision_number
                        }).then(function successCallback(response2) {
                            $scope.stusertable2.destroy();
                            $('#stuSerchTableBody2').empty();
                            var i = 0;
                            for (i = 0; i < response2.data.result.length; i++) {
                                var payablemonth = response2.data.result[i].stuAccPaybleMonth;
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

                                $("#stuSerchTableBody2").append("<tr><td>"
                                        + response2.data.result[i].stuAccTid + "</td><td>"
                                        + response2.data.result[i].stuAccPaybleYear + "</td><td>"
                                        + payablemonthText + "</td><td>"
                                        + response2.data.result[i].lid.studyClass.clsName + "</td><td>"
                                        + response2.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                        + response2.data.result[i].stuAccPaidDate + "</td><td>"
                                        + response2.data.result[i].lid.learnFee + "</td></tr>");
                            }
                            $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
                            $("#StudentSearchResultByName2").show();
                        }, function errorCallback(response) {
                            swal('Error!', 'Something Wrong!', 'error');
                        });
                    } else {
                        swal('Error!', 'Student Registration Number is Not Exist', 'error');
                    }
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                });
            }
        }
    };
    $scope.pay_fee = function () {
        if (!$scope.formsinglesublitControleFlag1) {
            $scope.formsinglesublitControleFlag1 = true;
			swal({
				  title: "Are you sure?",
				  text: "You will not be able to recover this payment!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Yes, Pay it!",
				  cancelButtonText: "No, cancel payment!",
				  closeOnConfirm: false,
				  closeOnCancel: false
				},
				function(isConfirm){
				  if (isConfirm) {
					if ($scope.stusertable.rows('.selected').data().length == 0) {
						swal('Error!', 'First Select Fees', 'error');
					} else {
						var i = 0;
						$scope.feeslist = [];
						for (i = 0; i < $scope.stusertable.rows('.selected').data().length; i++) {
							var selectedRecodeID = $scope.stusertable.rows('.selected').data()[i][1];
							$scope.feeslist.push(selectedRecodeID);
						}

						$http({
							method: 'POST',
							url: 'http://localhost:8084/SmileClass/fees',
							data: {
								"feeslist": $scope.feeslist
							}
						}).then(function successCallback(response) {
							//load need to pay table
							$http({
								method: 'GET',
								url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
							}).then(function successCallback(response) {
								$scope.stusertable.destroy();
								$('#stuSerchTableBody').empty();
								var i = 0;
								$scope.creditBal = 0;
								for (i = 0; i < response.data.result.length; i++) {
									$("#stuSerchTableBody").append("<tr><td></td><td>"
											+ response.data.result[i].stuAccTid + "</td><td>"
											+ response.data.result[i].stuAccPaybleYear + "</td><td>"
											+ response.data.result[i].stuAccPaybleMonth + "</td><td>"
											+ response.data.result[i].lid.studyClass.clsName + "</td><td>"
											+ response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
											+ response.data.result[i].lid.learnFee + "</td></tr>");
									$scope.creditBal = $scope.creditBal + response.data.result[i].lid.learnFee;
								}
								$scope.stusertable = $("#StudentSearchResultByName").DataTable({
									columnDefs: [{
											orderable: false,
											className: 'select-checkbox',
											targets: 0
										}],
									select: {
										style: 'multi',
										selector: 'td:first-child'
									},
									order: [[1, 'asc']]
								});
								$("#studentSearchingTable").show();
								//load payment history
								$http({
									method: 'GET',
									url: 'http://localhost:8084/SmileClass/fees-history/' + $scope.addmision_number
								}).then(function successCallback(response2) {
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
									$scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
									$("#StudentSearchResultByName2").show();
									swal('Success!', 'Student Fees Payment is Successfully Updated!', 'success');
									$scope.formsinglesublitControleFlag1 = false;
								}, function errorCallback(response) {
									swal('Error!', 'Something Wrong!', 'error');
								});
							}
							, function errorCallback(response) {
								swal('Error!', 'Something Wrong!', 'error');
							});
						}, function errorCallback(response) {
							swal('Error!', 'Something Wrong!', 'error');
							$scope.formsinglesublitControleFlag1 = false;
						});

					}
				  } else {
					swal("Cancelled", "Your payment is not done :)", "error");
					$scope.formsinglesublitControleFlag1 = false;
				  }
				});
			
			
			
			
			
            

        }
    };
});