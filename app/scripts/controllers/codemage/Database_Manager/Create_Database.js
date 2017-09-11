'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('Create_Database', function ($scope,$http) {
	//define variables
	$scope.databasename = '';
	$scope.query = 'waiting for query';
	 
	 
	//define methodes
    $scope.showQuery = function() {
        $scope.query = ('CREATE DATABASE '+ $scope.databasename + ' ;');
    };

    $scope.submit = function() {
        // Simple GET request example:
		$http({
		  method: 'POST',
		  url: 'http://192.168.1.34:8084/CodeMage/database',
		  data : {
					"user_dbname":$scope.databasename,
					"userid": 1
				}
		}).then(function successCallback(response) {
			swal("Success!", "Database is Succesfully Created" , "success");
			console.log(response);
		  }, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		  });
    };
	
	

});