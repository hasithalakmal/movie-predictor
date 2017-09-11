'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('delete_student', function ($scope, $http) {
	$scope.addmision_number = "";
	$scope.formsinglesublitControleFlag1 = false;

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
        }
    };




    $scope.submit = function (form) {
        if (form.validate()) {
			if (!$scope.formsinglesublitControleFlag1) {
					$scope.formsinglesublitControleFlag1 = true;
					$http({
						method: 'GET',
						url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
					}).then(function successCallback(response) {
						if(response.data.result){
							$http({
								method: 'DELETE',
								url: 'http://localhost:8084/SmileClass/student/' + $scope.addmision_number
							}).then(function successCallback(response) {
								$scope.addmision_number = '';
								swal('Success!','Student is Successfully Deleted!','success');
								$scope.formsinglesublitControleFlag1 = false;
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
});
'use strict';

