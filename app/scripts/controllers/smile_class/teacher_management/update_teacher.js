'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('update_teacher', function ($scope, $http) {
    $scope.addmision_number = "";
	$scope.formsinglesublitControleFlag1 = false;

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
                required: "Please Enter Teacher qualification. This is required."
            }
        },
    };

	 $scope.init = function () {
		$scope.formsinglesublitControleFlag1 = false;
		$scope.formsinglesublitControleFlag2 = false;
		$scope.update_stste = true;
		$http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/teacher'
        }).then(function successCallback(response) {
            $scope.tea_names_select = response.data.result;
            $scope.selected = response.data.result[0].teaId;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    }

    $scope.submit1 = function (form) {
			if (!$scope.formsinglesublitControleFlag1) {
					$scope.formsinglesublitControleFlag1 = true;
					
							$http({
								method: 'GET',
								url: 'http://localhost:8084/SmileClass/teacher/' + $scope.selected
							}).then(function successCallback(response) {
								$scope.teachername = response.data.teaName;
								$scope.teacheraddress = response.data.teaAddress;
								$scope.phone1 = response.data.teaPhone1;
								$scope.phone2 = response.data.teaPhone2;
								$scope.phone3 = response.data.teaPhone3;
								$scope.techerSchool = response.data.techerSchool;
								$scope.teacherquality = response.data.teaQua;
								$scope.teaId = response.data.teaId;
								
								$scope.formsinglesublitControleFlag1 = false;
								$scope.update_stste = false;
							}, function errorCallback(response) {
								swal('Can not Delete!','This Data is used in another Programme!','error');
								$scope.formsinglesublitControleFlag1 = false;
							});
						
					
				}
        
    };
	
	//update function
    $scope.submit2 = function (form) {
        if (form.validate()) {
			if (!$scope.formsinglesublitControleFlag2) {
				$scope.formsinglesublitControleFlag2 = true;
				$http({
					method: 'PUT',
					url: 'http://localhost:8084/SmileClass/teacher',
					data: {
							  "teaName": $scope.teachername,
							  "teaAddress": $scope.teacheraddress,
							  "teaPhone1": $scope.phone1,
							  "teaPhone2": $scope.phone2,
							  "teaPhone3": $scope.phone3,
							  "techerSchool": $scope.techerSchool,
							  "teaQua": $scope.teacherquality,
							  "teaId": $scope.selected,
							  "recodeState": null,
							  "recordDate": null,
							  "recordAdded": null,
							  "modifiedDate": null,
							  "recordEditBy": null
							}
				}).then(function successCallback(response) {
					$scope.subjectname1 = "";
					$scope.init();
					swal("Success!", "Teacher is Successfully Updated!", "success");
					$scope.formsinglesublitControleFlag2 = false;
				}, function errorCallback(response) {
					swal('Error!','Something Wrong!','error');
					$scope.formsinglesublitControleFlag2 = false;
				});
			}
        }
    };
	
	
});