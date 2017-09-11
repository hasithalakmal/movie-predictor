'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular' ).controller('Insert_Data', function ($scope, $filter, $http, $sce, $compile) {
var feildname=[];
$scope.dtypes=[];
var length =0;

$scope.database_names_select ="";
$scope.table_names_select ="";
$scope.table_heder = "";
$scope.table_body = "";
$scope.table_newdata = "";
$scope.input_feilds ="";
$scope.input_tbl ="";

$scope.addDataBtn = "";
		
$scope.query = "Waiting For Query";
$scope.java ="Waiting For Java Code";

$scope.inputFeild ="";

	
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
	
	
	
	
	


 $scope.users = [  ]; 

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
	console.log('adduser start');
    $scope.inserted = {
      id: $scope.users.length+1,
      feild1: '',
      feild2: '',
      feild3: '', 
	  feild4: '',
      feild5: '',
      feild6: '', 
	  feild7: '',
      feild8: '',
      feild9: '', 
	  feild10: '',
      feild11: '',
      feild12: '', 
	  feild13: '',
      feild14: '',
      feild15: ''
    };

   $scope.users.push($scope.inserted);
   console.log( $scope.users);
   //$scope.insertData ();
   console.log('adduser end');
  };

  
  
  
  
  
  
  
  
  
  
  
  
  
  $scope.submit  = function(){
			$http({
			  method: 'GET',
			  url: 'http://192.168.1.34:8084/CodeMage/colmns/'+$scope.selectedDB+'/'+$scope.selectedTBL
			}).then(function successCallback(response) {
				feildname = response.data;
				var i=0;
				var tblHeady = "<tr>";
				for(i = 0; i< response.data.length; i++){
					tblHeady = tblHeady + "<th>"+response.data[i]+"</th>";
				} 
				tblHeady = tblHeady + '</tr>';
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
				$scope.table_body = $sce.trustAsHtml(response.data.result);
				$scope.input_feilds = $sce.trustAsHtml(response.data.table);
				$scope.input_tbl = "";
			}, function errorCallback(response) {
				swal(
				  'error!',
				  'something wrong!',
				  'error'
				)
			});
			
			
		
		$http({
			  method: 'GET',
			  url: 'http://192.168.1.34:8084/CodeMage/colmn-types/'+$scope.selectedDB+'/'+$scope.selectedTBL
			}).then(function successCallback(response) {
				$scope.dtypes = response.data;
				length = response.data.length;
			}, function errorCallback(response) {
				swal(
				  'error!',
				  'something wrong!',
				  'error'
				)
			});

			
		};


$scope.insertData = function(){
		console.log('insertData start');
		console.log($scope.users[0].feild0);
		console.log($scope.users[0].feild1);
		var valuesofData = [];
		switch(length) {
				case 1:
					valuesofData[0] = $scope.users[0].feild0;
					break;
				case 2:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					break;
				case 3:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					break;
				case 4:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					break;
				case 5:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					break;
				case 6:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					break;
				case 7:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					break;
				case 8:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					break;
				case 9:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					valuesofData[8] = $scope.users[0].feild8;
					break;
				case 10:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					valuesofData[8] = $scope.users[0].feild8;
					valuesofData[9] = $scope.users[0].feild9;
					break;
				case 11:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					valuesofData[8] = $scope.users[0].feild8;
					valuesofData[9] = $scope.users[0].feild9;
					valuesofData[10] = $scope.users[0].feild10;
					break;
				case 12:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					valuesofData[8] = $scope.users[0].feild8;
					valuesofData[9] = $scope.users[0].feild9;
					valuesofData[10] = $scope.users[0].feild10;
					valuesofData[11] = $scope.users[0].feild11;
					break;
				case 13:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					valuesofData[8] = $scope.users[0].feild8;
					valuesofData[9] = $scope.users[0].feild9;
					valuesofData[10] = $scope.users[0].feild10;
					valuesofData[11] = $scope.users[0].feild11;
					valuesofData[12] = $scope.users[0].feild12;
					break;
				case 14:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					valuesofData[8] = $scope.users[0].feild8;
					valuesofData[9] = $scope.users[0].feild9;
					valuesofData[10] = $scope.users[0].feild10;
					valuesofData[11] = $scope.users[0].feild11;
					valuesofData[12] = $scope.users[0].feild12;
					valuesofData[13] = $scope.users[0].feild13;
					break;
				case 15:
					valuesofData[0] = $scope.users[0].feild0;
					valuesofData[1] = $scope.users[0].feild1;
					valuesofData[2] = $scope.users[0].feild2;
					valuesofData[3] = $scope.users[0].feild3;
					valuesofData[4] = $scope.users[0].feild4;
					valuesofData[5] = $scope.users[0].feild5;
					valuesofData[6] = $scope.users[0].feild6;
					valuesofData[7] = $scope.users[0].feild7;
					valuesofData[8] = $scope.users[0].feild8;
					valuesofData[9] = $scope.users[0].feild9;
					valuesofData[10] = $scope.users[0].feild10;
					valuesofData[11] = $scope.users[0].feild11;
					valuesofData[12] = $scope.users[0].feild12;
					valuesofData[13] = $scope.users[0].feild13;
					valuesofData[14] = $scope.users[0].feild14;
					break;
				default:
					console.log('something wrong');
			}
		
		console.log(valuesofData);
		
		var insertdataJson = {
								  "db_name": $scope.selectedDB,
								  "inser_data": {
									"table_name": $scope.selectedTBL,
									"feild_names": feildname,
									"data_types": $scope.dtypes,
									"data_value": valuesofData
								  }
								};
	
		$http({
			  method: 'POST',
			  data : insertdataJson,
			  url: 'http://192.168.1.34:8084/CodeMage/insert'
			}).then(function successCallback(response) {
				$scope.query = response.data.query;
				$scope.java = response.data.java_code;
				$scope.submit();
			}, function errorCallback(response) {
				swal(
				  'error!',
				  'something wrong! massa',
				  'error'
				)
			});
			
			console.log('insertData end');
	
};



   
});