'use strict';
/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('fees', function ($scope, $http, $q) {
    $scope.isStudentSelect = false;
    $scope.formsinglesublitControleFlag1 = false;
    $scope.formsinglesublitControleFlag2 = false;
	$scope.confitmation = false;
	//$scope.paid_amount = 500;
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
		
		 $scope.stusertable.on( 'select', function ( e, dt, type, indexes ) {
			if ( type === 'row' ) {
				var i = 0;
				$scope.paid_amount = 0;
				for (i = 0; i < $scope.stusertable.rows('.selected').data().length; i++) {
					var selectedFee = $scope.stusertable.rows('.selected').data()[i][6];
					$scope.paid_amount =  $scope.paid_amount + parseFloat(selectedFee);
				}
				console.log("fees = "+$scope.paid_amount );
				$("#paid_amount_jq").val($scope.paid_amount);

			}
			} );
		
    });
	$scope.sample = function(){
	
	};
	
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
							$scope.previousAries = response.data.aries;
                            $scope.classess = response.data.result;
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

                                $("#stuSerchTableBody").append("<tr><td></td><td>"
                                        + response.data.result[i].stuAccTid + "</td><td>"
                                        + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                        + payablemonthText + "</td><td>"
                                        + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                        + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                        + response.data.result[i].stuAccAmount + "</td></tr>");
                                $scope.creditBal = $scope.creditBal + response.data.result[i].stuAccAmount;
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

                                $("#stuSerchTableBody2").append("<tr><td>"
                                        + response2.data.result[i].stuAccTid + "</td><td>"
                                        + response2.data.result[i].stuAccPaybleYear + "</td><td>"
                                        + payablemonthText + "</td><td>"
                                        + response2.data.result[i].lid.studyClass.clsName + "</td><td>"
                                        + response2.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                        + response2.data.result[i].stuAccPaidDate + "</td><td>"
                                        + response2.data.result[i].stuAccAmount + "</td></tr>");
                            }
                            $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
                            $("#StudentSearchResultByName2").show();
                        }, function errorCallback(response) {
                            swal('Error!', 'Something Wrong!', 'error');
                        });
                        //load add needto pay
                        $http({
                            method: 'GET',
                            url: 'http://localhost:8084/SmileClass/student-all-learn-classes/' + $scope.addmision_number
                        }).then(function successCallback(response3) {
							if(response3.data.result.length>0){
								$scope.learn_classes_select = response3.data.result;
								$scope.learnID = response3.data.result[0].lid;
								var d = new Date();
								var month = d.getMonth() + 1;
								console.log('month = ' + month);
								$scope.payableYear = 2017;
								$scope.payableMonth = month;
							}
                            
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
        if (!$scope.formsinglesublitControleFlag1 && $scope.paid_amount!=null) {
            $scope.formsinglesublitControleFlag1 = true;
			if ($scope.stusertable.rows('.selected').data().length == 0) {
                swal('Error!', 'First Select Fees', 'error');
            }else{
				var i = 0;
				$scope.feeslist = [];
				for (i = 0; i < $scope.stusertable.rows('.selected').data().length; i++) {
					var selectedRecodeID = $scope.stusertable.rows('.selected').data()[i][1];
					$scope.feeslist.push(selectedRecodeID);
					
				}
				console.log($scope.feeslist);
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
						function (isConfirm) {
							if (isConfirm) {
									if(! $scope.confitmation){
										$scope.confitmation = true;
										$http({
											method: 'POST',
											url: 'http://localhost:8084/SmileClass/fees',
											data: {
												"feeslist": $scope.feeslist,
												"paidAmount" : $scope.paid_amount,
												"previousAries": $scope.previousAries,
												"stuID" : $scope.addmision_number
											}
										}).then(function successCallback(response) {
											$scope.paid_amount = null;
											//load need to pay table
											$http({
												method: 'GET',
												url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
											}).then(function successCallback(response) {
												$scope.previousAries = response.data.aries;
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
															+ response.data.result[i].stuAccAmount + "</td></tr>");
													$scope.creditBal = $scope.creditBal + response.data.result[i].stuAccAmount;
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
																+ response2.data.result[i].stuAccAmount + "</td></tr>");
													}
													$scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
													$("#StudentSearchResultByName2").show();
													swal('Success!', 'Student Fees Payment is Successfully Updated!', 'success');
													$scope.formsinglesublitControleFlag1 = false;
													$scope.confitmation = false;
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
											$scope.confitmation = false;
										});
									}
									
							} else {
								swal("Cancelled", "Your payment is not done :)", "error");
								$scope.formsinglesublitControleFlag1 = false;
							}
						});
			}
           
        }else{
			swal("Invalid", "Enter Paid Amount", "error");
		}
    };

	$scope.payAries = function(){
		if (!$scope.formsinglesublitControleFlag4 && $scope.aries_payment_amount!=null) {
            $scope.formsinglesublitControleFlag4 = true;
			$http({
					method: 'POST',
					url: 'http://localhost:8084/SmileClass/aries-payment',
					data: {
							"ariesPaymentAmount" : $scope.aries_payment_amount,
							"stuID" : $scope.addmision_number
						}
					}).then(function successCallback(response) {
						$scope.paid_amount = null;
						$scope.aries_payment_amount = null;
										//load need to pay table
										$http({
											method: 'GET',
											url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
										}).then(function successCallback(response) {
											$scope.previousAries = response.data.aries;
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
														+ response.data.result[i].stuAccAmount + "</td></tr>");
												$scope.creditBal = $scope.creditBal + response.data.result[i].stuAccAmount;
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
															+ response2.data.result[i].stuAccAmount + "</td></tr>");
												}
												$scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
												$("#StudentSearchResultByName2").show();
												swal('Success!', 'Student Fees Payment is Successfully Updated!', 'success');
												$scope.formsinglesublitControleFlag4 = false;
											}, function errorCallback(response) {
												swal('Error!', 'Something Wrong!', 'error');
											});
										}
										, function errorCallback(response) {
											swal('Error!', 'Something Wrong!', 'error');
											$scope.formsinglesublitControleFlag4 = false;
										});
					}, function errorCallback(response) {
						swal('Error!', 'Something Wrong!', 'error');
					});
		}else{
			swal("Invalid", "Enter Paid Amount", "error");
		}
	};
	
    $scope.submit3 = function () {
        if (!$scope.formsinglesublitControleFlag3) {
            $scope.formsinglesublitControleFlag3 = true;
            $http({
                method: 'POST',
                url: 'http://localhost:8084/SmileClass/add-fees',
                data: {
                    "learnID": $scope.learnID,
                    "paybaleMonth": $scope.payableMonth,
                    "payableYear": $scope.payableYear,
                    "addmisionNumber": $scope.addmision_number,
                }
            }).then(function successCallback(response2) {
                if (response2.data.result == "success") {
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

                            $("#stuSerchTableBody").append("<tr><td></td><td>"
                                    + response.data.result[i].stuAccTid + "</td><td>"
                                    + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                    + payablemonthText + "</td><td>"
                                    + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                    + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                    + response.data.result[i].stuAccAmount + "</td></tr>");
                            $scope.creditBal = $scope.creditBal + response.data.result[i].stuAccAmount;
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
						//swal('Success!', 'Add new Fees', 'success');
                        $scope.isStudentSelect = true;
                        $scope.formsinglesublitControleFlag3 = false;
                    }, function errorCallback(response) {
                        swal('Error!', 'Something Wrong!', 'error');
                        $scope.formsinglesublitControleFlag3 = false;
                    });
                } else if (response2.data.result == "alredy_exsist") {
                    swal('Error!', 'That Record Is Alredy Exist', 'error');
					$scope.formsinglesublitControleFlag3 = false;
                } else {
                    swal('Error!', 'Something Wrong!', 'error');
					$scope.formsinglesublitControleFlag3 = false;
                }
            }, function errorCallback(response) {
                swal('Error!', 'Something Wrong!', 'error');
            });


        }
    };

});