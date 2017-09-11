'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('update_student', function ($scope, $http) {
	$scope.addmision_number = "";
	$scope.formsinglesublitControleFlag1 = false;

    $scope.validationOptions1 = {
        rules: {
            addmision_number: {
                required: true
            }
        },
        messages: {
            addmision_number: {
                required: "Please Enter Student Registration Number. This is required."
            }
        }
    };

	//My validation functions 
	
	//for letters_and_space_only - full name
	jQuery.validator.addMethod("letters_only", function(value, element) {
		  return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
	}, "Letters only please"); 
	//for letters_and_space_only - full name
	jQuery.validator.addMethod("letters_and_space_only", function(value, element) {
		  return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
	}, "Letters only please"); 
	//for letters_and_space_fillstop_only - name with initials
	jQuery.validator.addMethod("letters_and_space_fulstop_only", function(value, element) {
		  return this.optional(element) || /^[a-zA-Z.\s]+$/i.test(value);
	}, "Letters only please"); 
	//for phone number - land phone number/mobile phone number
	jQuery.validator.addMethod("phone_numbers", function(value, element) {
		  return this.optional(element) || /^\(?0\d{2}\)?[\s\-]?\d{7}$/i.test(value);
	}, "Letters only please"); 
	//for NIC number 
	jQuery.validator.addMethod("nic_numbers", function(value, element) {
		  return this.optional(element) || /^[0-9]{9}[vVxX]$/i.test(value);
	}, "Letters only please"); 

    $scope.validationOptions2 = {
        rules: {
            studentname: {
                required: true
            },
            dob: {
                required: true
            },
            school: {
                required: true
            },
            guardianname: {
                required: true
            },
            address: {
                required: true
            },
            phone1: {
                required: true,
				phone_numbers : true
            },
			phone2: {
				phone_numbers : true
            },
			phone3: {
				phone_numbers : true
            },
			addmisionFee:{
				required:true
			}
        },
        messages: {
            studentname: {
                required: "Please Enter Student Name. This is required."
            },
            dob: {
                required: "Please Enter Date of Birth. This is required."
            },
            school: {
                required: "Please Enter School Name. This is required."
            },
            guardianname: {
                required: "Please Enter Guardian Name. This is required."
            },
            address: {
                required: "Please Enter Student Address. This is required."
            },
            phone1: {
                required: "Please Enter Student Phone Number. This is required.",
				phone_numbers : "Please Enter Valid Phone Number"
            },
			phone2: {
				phone_numbers : "Please Enter Valid Phone Number"
            },
			phone3: {
				phone_numbers : "Please Enter Valid Phone Number"
            },
			addmisionFee: {
                required: "Please Enter Student Phone Number. This is required."
            }
        },
    };

	 $scope.init = function () {
		$scope.formsinglesublitControleFlag1 = false;
		$scope.formsinglesublitControleFlag2 = false;
		$scope.update_stste = true;
		$http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.grade_select = response.data.result;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    }

    $scope.submit1 = function (form) {
        if (form.validate()) {
			if (!$scope.formsinglesublitControleFlag1) {
					$scope.formsinglesublitControleFlag1 = true;
					$http({
						method: 'GET',
						url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
					}).then(function successCallback(response) {
						if(response.data.result){
							$http({
								method: 'GET',
								url: 'http://localhost:8084/SmileClass/student/' + $scope.addmision_number
							}).then(function successCallback(response) {
								$scope.studentname = response.data.stuName;
								$scope.dob = new Date(response.data.dOB);
								$scope.phone1 = response.data.stuPhone1;
								$scope.phone2 = response.data.stuPhone2;
								$scope.phone3 = response.data.stuPhone3;
								$scope.guardianname = response.data.guarName;
								$scope.address = response.data.stuAdress;
								$scope.school = response.data.stuSchool;
								$scope.stuGrade = response.data.stuGrade;
								$scope.stuAccBal = response.data.stuAccBal;
								$scope.recodeState = 2;
								$scope.recordDate = response.data.recordDate;
								$scope.recordAdded = response.data.recordAdded;
								$scope.formsinglesublitControleFlag1 = false;
								$scope.update_stste = false;
							}, function errorCallback(response) {
								$scope.addmision_number = '';
								swal('Can not Delete!','This Data is used in another Programme!','error');
								$scope.formsinglesublitControleFlag1 = false;
							});
						}else{
							swal('Error!','Student ID Doesn\'t Exsist!','error');
							$scope.formsinglesublitControleFlag1 = false;
						}
					}, function errorCallback(response) {
						swal('Error!','Something Wrong!','error');
						$scope.formsinglesublitControleFlag1 = false;
					});
				}
        }
    };
	
	//update function
    $scope.submit2 = function (form) {
        if (form.validate()) {
			if (!$scope.formsinglesublitControleFlag2) {
				$scope.formsinglesublitControleFlag2 = true;
				$http({
					method: 'PUT',
					url: 'http://localhost:8084/SmileClass/student',
					data: {
							  "stuName": $scope.studentname,
							  "dOB": $scope.dob,
							  "stuPhone1": $scope.phone1,
							  "stuPhone2": $scope.phone2,
							  "stuPhone3": $scope.phone3,
							  "guarName": $scope.guardianname,
							  "stuId": $scope.addmision_number,
							  "recodeState": $scope.recodeState,
							  "recordDate": $scope.recordDate,
							  "recordAdded": $scope.recordAdded,
							  "stuAdress": $scope.address,
							  "stuSchool": $scope.school,
							  "stuGrade": $scope.stuGrade,
							  "stuAccBal": $scope.stuAccBal 
							}
				}).then(function successCallback(response) {
					$scope.subjectname1 = "";
					$scope.init();
					swal("Success!", "Student is Successfully Updated!", "success");
					$scope.formsinglesublitControleFlag2 = false;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag2 = false;
				});
			}
        }
    };
	
	
});