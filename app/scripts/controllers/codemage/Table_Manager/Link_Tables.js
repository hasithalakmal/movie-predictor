'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('Link_Tables', function ($scope, $http) {
 
 	var actions = ['cascade','set null','restrict','no action'];

  $scope.database_names_select ="";
  $scope.table_names_select_base ="";
  $scope.table_names_select_base_f ="";
  $scope.table_names_select_ref ="";
  $scope.table_names_select_ref_f ="";
  $scope.table_names_select_ondel =actions;
  $scope.table_names_select_onupd =actions;
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
				$scope.table_names_select_base = response.data;
				$scope.table_names_select_ref = response.data;
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
	};
	
	
	$scope.getBaseFeild = function (){
		$http({
		  method: 'GET',
		  url: 'http://192.168.1.34:8084/CodeMage/colmns/'+$scope.selectedDB+'/'+$scope.selectedTBL_BASE
		}).then(function successCallback(response) {
				$scope.table_names_select_base_f = response.data;
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
	};
	
	
	$scope.getRefFeild = function (){
		$http({
		  method: 'GET',
		  url:  'http://192.168.1.34:8084/CodeMage/colmns/'+$scope.selectedDB+'/'+$scope.selectedTBL_REF
		}).then(function successCallback(response) {
				$scope.table_names_select_ref_f = response.data;
		}, function errorCallback(response) {
			swal(
			  'error!',
			  'something wrong!',
			  'error'
			)
		});
	};
	
	
	$scope.submit = function (){
			var fk_data ={
					"db_name":$scope.selectedDB,
					"fk_details":{
					  "fk_name": $scope.FK_name ,
					  "base_table": $scope.selectedTBL_BASE,
					  "bt_feild_name": $scope.selectedTBL_BASE_F,
					  "reference_table": $scope.selectedTBL_REF,
					  "rt_feild_name": $scope.selectedTBL_REF_F,
					  "on_delete": $scope.selected_ON_DEL,
					  "on_update": $scope.selected_ON_UPD
						}
					};
					
		console.log(fk_data);
	
		$http({
		method: 'POST',
		data : fk_data,
		url: 'http://192.168.1.34:8084/CodeMage/table-fk'
		}).then(function successCallback(response) {
				$scope.query = response.data.query;
				console.log(response.data.query);
				swal(
				  'success!',
				  'Foreign Key is succussfully created!',
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