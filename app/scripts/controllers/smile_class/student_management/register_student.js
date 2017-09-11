'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_student', function ($scope, $http) {
    $scope.studentname = "";
    $scope.formsinglesublitControleFlag = false;
	
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

    $scope.validationOptions = {
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
                required: "Please Enter Admission Fee. This is required."
            }
        },
    };

	$scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.grade_select = response.data.result;
            $scope.stuGrade = response.data.result[0].clsTypeName;
			$scope.addmisionFee = 500;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/student',
                    data: {
                        "stuName": $scope.studentname,
                        "dOB": $scope.dob,
                        "stuPhone1": $scope.phone1,
                        "stuPhone2": $scope.phone2,
                        "stuPhone3": $scope.phone3,
                        "guarName": $scope.guardianname,
                        "stuAdress": $scope.address,
                        "stuSchool": $scope.school,
						"stuGrade": $scope.stuGrade,
						"stuAccBal":$scope.addmisionFee
                    }

                }).then(function successCallback(response) {
                    $scope.studentname = "";
                    $scope.dob = "";
                    $scope.phone1 = "";
                    $scope.phone2 = "";
                    $scope.phone3 = "";
                    $scope.guardianname = "";
                    $scope.address = "";
                    $scope.school = "";
                    swal("Success!", "Student is Successfully Registered!", "success");
                    $scope.formsinglesublitControleFlag = false;
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });
            }
        };
    };
});