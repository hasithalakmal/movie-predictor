'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('print_pay_sheets', function ($scope, $http) {
    $scope.tea_names_select = "";
    $scope.teacher_name_table = "";
    $scope.formsinglesublitControleFlag = false;
	$scope.formsinglesublitControleFlag0 = false;
	
	$scope.validationOptions = {
        rules: {
            salaryAmount: {
                required: true,
            }
        },
        messages: {
            salaryAmount: {
                required: "Please Enter Payment Amount",
            }
        }
    };

    $(document).ready(function () {
        $scope.learn_class_table = $("#learn_class_table").DataTable({});
        $scope.teacherAcc = $("#teacherAcc").DataTable({});
        $scope.teacherAcc2 = $("#teacherAcc2").DataTable();
    });

    $scope.init = function () {
		var d = new Date();
        var month = d.getMonth() + 1;
        $scope.paysheetYear = 2017;
        $scope.paysheetMonth = month;
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
		if ( isNaN( date ) ) {  
				var input = inputdate;

				var year = input.slice(-4),
					month = ['Jan','Feb','Mar','Apr','May','Jun',
							 'Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(input.substr(4,3))+1,
					day = input.substr(8,2);

				var output = year + '-' + (month<10?'0':'') + month + '-' + day;
				date = new Date(output);
			}
		console.log(inputdate);
		console.log(date);
		console.log(">>>>>>>>>>>>>>>>>>>>>>")
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +   date.getDate();
	};

    $scope.selectTeacher = function () {
		if (!$scope.formsinglesublitControleFlag0) {
                $scope.formsinglesublitControleFlag0 = true;
				$http({
					method: 'GET',
					url: 'http://localhost:8084/SmileClass/teacher/' + $scope.selected
				}).then(function successCallback(response) {
					$scope.teacher_personaldata = response.data;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
				});

				$scope.isSelected2 = true;
				//PaySheet-account
				$http({
					method: 'POST',
					url: 'http://localhost:8084/SmileClass/teacher-paysheet-new',
					data: {
						"paysheetMonth": $scope.paysheetMonth,
						"paysheetYear": $scope.paysheetYear,
						"teacher_id": $scope.selected
					}
				}).then(function successCallback(response) {
					$scope.teacherAcc2.destroy();
					$('#teacherTableBody2').empty();
					var i = 0;
					for (i = 0; i < response.data.result.length; i++) {
						$scope.type = response.data.result[i].accBalType;
						/* $scope.totalStudents = 0;
						$scope.totalFullPaidStudents = 0;
						$scope.totalHalfPaidStudents = 0; */
						if(response.data.result[i].totalNumberOfStudents == 0){
							$scope.totalStudents ="";
						}else{
							$scope.totalStudents = response.data.result[i].totalNumberOfStudents;
						}
						if(response.data.result[i].totalNumberOfFreeCardStudents == 0){
							$scope.totalFreeCardStudents ="";
						}else{
							$scope.totalFreeCardStudents = response.data.result[i].totalNumberOfFreeCardStudents;
						}
						if(response.data.result[i].numberOfPaidStudentsFull == 0){
							$scope.totalFullPaidStudents ="";
						}else{
							$scope.totalFullPaidStudents = response.data.result[i].numberOfPaidStudentsFull;
						}
						if(response.data.result[i].numberOfPaidStudentsHalf == 0){
							$scope.totalHalfPaidStudents ="";
						}else{
							$scope.totalHalfPaidStudents = response.data.result[i].numberOfPaidStudentsHalf;
						}
						
						
						if ($scope.type == "credit") {
							$("#teacherTableBody2").append("<tr><td>"
									+ response.data.result[i].recodeID + "</td><td>"
									+ $scope.dateFormatter(response.data.result[i].transactionDate) + "</td><td>"
									+ response.data.result[i].transactionDescription + "</td><td>"
									+ $scope.totalStudents + "</td><td>"
								 	+ $scope.totalFreeCardStudents + "</td><td>"
								/*	+ response.data.result[i].totalNumberOfHalfPaidStudents + "</td><td>"
									+ response.data.result[i].totalNumberOfFullPaidStudents + "</td><td>" */
									+ $scope.totalHalfPaidStudents  + "</td><td>"
									/* + response.data.result[i].halfCardIncome + "</td><td>" */
									+ $scope.totalFullPaidStudents + "</td><td>"
									/* + response.data.result[i].fullCardIncome + "</td><td>" */
									+ response.data.result[i].totalAmount + "</td><td>"
									+ "" + "</td></tr>");
						} else {
							$("#teacherTableBody2").append("<tr><td>"
									+ response.data.result[i].recodeID + "</td><td>"
									+ $scope.dateFormatter(response.data.result[i].transactionDate) + "</td><td>"
									+ response.data.result[i].transactionDescription + "</td><td>"
									+ $scope.totalStudents + "</td><td>"
									 + $scope.totalFreeCardStudents + "</td><td>"
									/*+ response.data.result[i].totalNumberOfHalfPaidStudents + "</td><td>"
									+ response.data.result[i].totalNumberOfFullPaidStudents + "</td><td>" */
									+ $scope.totalHalfPaidStudents  + "</td><td>"
									/* + response.data.result[i].halfCardIncome + "</td><td>" */
									+  $scope.totalFullPaidStudents + "</td><td>"
									/* + response.data.result[i].fullCardIncome + "</td><td>" */
									+ "" + "</td><td >"
									+ response.data.result[i].totalAmount + "</td></tr>");
						}
					}

					

					$scope.teacherAcc2 = $("#teacherAcc2").DataTable({
						dom: 'Bfrtip',
						buttons: [
							'copy', 'excel',
							{
								extend: 'print',
								text: 'Print selected',
								title: 'Sahas Educational Institute - Pay Sheet',
								message: 'This pay sheet is generated for ' + $scope.teacher_personaldata.teaName + '.\n\n</br></br>'
								+"TS - Total Number of Students\n</br>"
								 +"TF - Number of Free Card Students\n</br>"
								/*+"TH - Number of Half Card Students\n</br>"
								+"TFU - Number of Full Card Students\n</br>" */
								+"PH - Number of Paid Half  Card Students\n</br>"
								/* +"HA - Amount of  Paid Half Card Students\n</br>" */
								+"PF - Number of Paid Full Card Students\n</br></br></br>",
								/* +"FA - Amount of Paid Full Card Students\n</br></br></br>", */
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
								message: 'This pay sheet is generated for ' + $scope.teacher_personaldata.teaName + '.\n\n</br></br>'
								+"TS - Total Number of Students\n</br>"
								+"TF - Number of Free Card Students\n</br>"
								/* +"TH - Number of Half Card Students\n</br>"
								+"TFU - Number of Full Card Students\n</br>" */
								+"PH - Number of Paid Half  Card Students\n</br>"
								/* +"HA - Amount of  Paid Half Card Students\n</br>" */
								+"PF - Number of Paid Full Card Students\n</br></br></br>",
								/* +"FA - Amount of Paid Full Card Students\n</br></br></br>", */
								orientation: 'portrait',
								pageSize: 'A4',
								download: 'open',
								exportOptions: {
									columns: [ 1, 2,3,4,5,6,7,8 ]
								},
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
							},
							/* 'colvis' */
						],
						/* columnDefs: [ {
							targets: -1,
							visible: false
						} ], */
						select: true
					}); 
					$("#teacherAcc2").show();
					$scope.formsinglesublitControleFlag0 = false;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag0 = false;
				});
			}
    };
    

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/salary',
                    data: {
                        "teaId": $scope.selected,
                        "amount": $scope.salaryAmount,
                        "Typeid": '3',
						"effectiveDate":$scope.effectiveDate
                    }
                }).then(function successCallback(response) {
                    $scope.salaryAmount = "";
                    $scope.selectTeacher();
                    swal("Success!", "Salary is Successfully Updated!", "success");
                    $scope.formsinglesublitControleFlag = false;
                }, function errorCallback(response) {
                    swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag = false;
                });
            }
        }
        ;
    };
});