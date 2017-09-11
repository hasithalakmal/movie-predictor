'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('View_Data', function ($scope, $http,$sce) {
		$scope.database_names_select ="";
		$scope.table_names_select ="";
		$scope.query ="Wating for Query";
	
		$scope.table_heder = "";
		$scope.table_body = "";
		
		$scope.query = "Waiting For Query";
		$scope.java ="Waiting For Java Code";
	
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
	
	
	$scope.submit  = function(){
			$http({
			  method: 'GET',
			  url: 'http://192.168.1.34:8084/CodeMage/colmns/'+$scope.selectedDB+'/'+$scope.selectedTBL
			}).then(function successCallback(response) {				
				var i=0;
				var tblHeady = "<tr>";
				console.log(response.data.length);
				
				for(i = 0; i< response.data.length; i++){
					tblHeady = tblHeady + "<th>"+response.data[i]+"</th>";
				} 
				
				tblHeady = tblHeady + '</tr>';
				console.log(tblHeady);
				$scope.table_heder = $sce.trustAsHtml(tblHeady);
			}, function errorCallback(response) {
				swal(
				  'error!',
				  'something wrong!',
				  'error'
				)
			});
			
			
			$http({
			  method: 'GET',
			  url: 'http://192.168.1.34:8084/CodeMage/data/'+$scope.selectedDB+'/'+$scope.selectedTBL
			}).then(function successCallback(response) {	
				console.log(response.data);
				$scope.table_body = $sce.trustAsHtml(response.data.result);
				$scope.query = response.data.query;
				$scope.java = response.data.java;
			}, function errorCallback(response) {
				swal(
				  'error!',
				  'something wrong!',
				  'error'
				)
			});
		};
	
});