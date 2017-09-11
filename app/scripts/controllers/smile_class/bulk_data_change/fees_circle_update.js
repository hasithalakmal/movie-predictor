'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('fees_circle_update', function ($scope, $http) {

    $scope.subject_names_select = "";
    $scope.formsinglesublitControleFlag = false;
	$scope.subjectname = "";

    

    $scope.submit = function () {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
				swal({
					title: "Are you sure?",
					text: "You will not be able to recover this update!",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Yes, Update!",
					cancelButtonText: "No, cancel update!",
					closeOnConfirm: false,
					closeOnCancel: false
				},
						function (isConfirm) {
							if (isConfirm) {
								$http({
									method: 'GET',
									url: 'http://localhost:8084/SmileClass/fees-circle-update'
								}).then(function successCallback(response) {
									swal('Success!','Update Fees Circle!','success');
								}, function errorCallback(response) {
									swal('Error!','Something Wrong!','error');
								});	
							} else {
								swal("Cancelled", "Your payment is not done :)", "error");
								$scope.formsinglesublitControleFlag1 = false;
							}
						});
				
				
                
            }
        
    };
});