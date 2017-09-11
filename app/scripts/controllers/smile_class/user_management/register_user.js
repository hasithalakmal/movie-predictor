'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_user', function ($scope, $http) {
$scope.studentname = "";
    $scope.formsinglesublitControleFlag = false;
	$scope.userType = "admin";
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
            userName: {
                required: true
            },
            password: {
                required: true
            },
            rePassword: {
                required: true,
				equalTo:"#password"
            }
        },
        messages: {
            userName: {
                required: "Please Enter User Name. This is required."
            },
            password: {
                required: "Please Enter Password. This is required."
            },
            rePassword: {
                required: "Please Enter Password Again. This is required.",
				equalTo:"Passwords are not equal"
            }
        },
    };

	

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/useraccounts',
                    data: {
                        "username": $scope.userName,
                        "usercategory": $scope.userType,
                        "userpassword": $scope.password,
                        "userstste": 1
                    }

                }).then(function successCallback(response) {
					if(response.data.result == "userNameAlredyExsist"){
						swal('Error!', 'User Name is Alredy Exsist!', 'error');
					}else{
						$scope.userName = "";
						$scope.password = "";
						$scope.rePassword = "";
					   
						swal("Success!", "User is Successfully Registered!", "success");
					}
                    
                    $scope.formsinglesublitControleFlag = false;
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });
            }
        }
        ;
    };
});