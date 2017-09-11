'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('Drop_Database', function ($scope, $http) {
	
  $scope.database_names_select ="";

  $scope.init  = function() {
		$http({
		  method: 'GET',
		  url: 'http://192.168.1.34:8084/CodeMage/database/1'
		}).then(function successCallback(response) {
			var dbs = [];
			var i = 0;
			for(i=0;i<response.data.length;i++){
				dbs[i] = response.data[i].user_dbname;
			}
			$scope.database_names_select = dbs;
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
    };
	
	
	$scope.submit  = function() {
		$http({
		  method: 'DELETE',
		  url: 'http://192.168.1.34:8084/CodeMage/database/'+  $scope.selected
		}).then(function successCallback(response) {
			swal(
			  'Success!',
			  'Database is successfully deleted!',
			  'success'
			)
			
		$scope.init();	
			
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
    };
});