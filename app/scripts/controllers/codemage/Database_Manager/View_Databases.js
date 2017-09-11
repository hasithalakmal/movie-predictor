'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('View_Databases', function ($scope,  $http, $sce) {
  
	$scope.database_name_table = "";
  
	$scope.init  = function() {
        // Simple GET request example:
		$http({
		  method: 'GET',
		  url: 'http://192.168.1.34:8084/CodeMage/database/1'
		}).then(function successCallback(response) {
			
			console.log(response.data);
			var tblBody = "";
			var i = 0;
			for(i = 0; i<response.data.length; i++){
				tblBody = tblBody + "<tr><td>"+response.data[i].user_dbname+"</td></tr>";
			} 
			
			$scope.database_name_table = $sce.trustAsHtml(tblBody);
			
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
    };
  
});