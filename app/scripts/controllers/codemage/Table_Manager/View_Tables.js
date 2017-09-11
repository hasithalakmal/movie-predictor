'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('View_Tables', function ($scope, $http,  $sce) {

	$scope.database_names_select = "";
	$scope.table_name_table = "";
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
				//console.log($scope.database_names_select);
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
			  url: 'http://192.168.1.34:8084/CodeMage/tables/'+$scope.selected
			}).then(function successCallback(response) {
				
				var i=0;
				var tblBody = "";
				console.log(response.data.length);
				
				for(i = 0; i< response.data.length; i++){
					tblBody = tblBody + "<tr><td>"+response.data[i]+"</td></tr>";
				} 
				console.log(tblBody);
				$scope.table_name_table = $sce.trustAsHtml(tblBody);
			}, function errorCallback(response) {
				swal(
				  'error!',
				  'something wrong!',
				  'error'
				)
			});
		};
});