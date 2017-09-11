'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_teacher', function ($scope, $http) {
	$scope.teachername = "";
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
            teachername: {
                required: true
            },
            teacheraddress: {
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
            techerSchool: {
                required: true
            },
            teacherquality: {
                required: true
            }
        },
        messages: {
            teachername: {
                required: "Please Enter Teacher Name. This is required."
            },
            teacheraddress: {
                required: "Please Enter Teacher Address. This is required."
            },
            phone1: {
                required: "Please Enter Phone Number. This is required.",
				phone_numbers : "Please Enter Valid Phone Number"
            },
			phone2: {
				phone_numbers : "Please Enter Valid Phone Number"
            },
			phone3: {
				phone_numbers : "Please Enter Valid Phone Number"
            },
            techerSchool: {
                required: "Please Enter Teacher School Name. This is required."
            },
            teacherquality: {
                required: "Please Enter Teacher Qualification. This is required."
            }
        },
    };

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/teacher',
                    data: {
                        "teaName": $scope.teachername,
                        "teaAddress": $scope.teacheraddress,
                        "teaPhone1": $scope.phone1,
                        "teaPhone2": $scope.phone2,
                        "teaPhone3": $scope.phone3,
                        "techerSchool": $scope.techerSchool,
                        "teaQua": $scope.teacherquality
                    }
                }).then(function successCallback(response) {
                    $scope.teachername = "";
                    $scope.teacheraddress = "";
                    $scope.phone1 = "";
                    $scope.phone2 = "";
                    $scope.phone3 = "";
                    $scope.techerSchool = "";
                    $scope.teacherquality = "";
                    swal("Success!", "Teacher Details are Successfully Registered!", "success");
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