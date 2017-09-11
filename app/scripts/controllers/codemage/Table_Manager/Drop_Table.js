'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('Drop_Table', function ($scope, $http) {
  $scope.database_names_select ="";
  $scope.table_names_select ="";
  $scope.query ="Waiting for Query";
	
	
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
	
	
	$scope.getTable = function (){
		$http({
		  method: 'GET',
		  url: 'http://192.168.1.34:8084/CodeMage/tables/'+$scope.selectedDB
		}).then(function successCallback(response) {
				$scope.table_names_select = response.data;
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
	};
	
	
	$scope.submit = function (){
		$http({
		method: 'DELETE',
		url: 'http://192.168.1.34:8084/CodeMage/table/'+$scope.selectedDB+'/'+$scope.selectedTBL
		}).then(function successCallback(response) {
				$scope.query = response.data.query;
				console.log(response.data.query);
				swal(
				  'success!',
				  'Database Table is successfully deleted!',
				  'success'
				)
				$scope.getTable();
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
	};
  
});