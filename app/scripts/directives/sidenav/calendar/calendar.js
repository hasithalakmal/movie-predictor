'use strict';

angular.module('dashyAngular')
	.directive('calendar',function(){
		return {
			templateUrl:'scripts/directives/sidenav/calendar/calendar.html?v='+window.app_version,
			restrict: 'E',
			replace: true,
		}
	});

angular.module('dashyAngular').controller('databaseCtrl', function ($scope, $modal, $log) {

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'mydbModalContent.html',
			controller: 'dbModalInstanceCtrl123',
			size: size,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});



		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
    
    
    
    
});






angular.module('dashyAngular').controller('dbModalInstanceCtrl123', function ($scope, $rootScope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		var obj = {}
		var count = 0;
		$rootScope.rowCount= $rootScope.fields.map(function(a) {
			obj['field'+count] = '';
			count++;
			return count
		});
		$rootScope.rows[0]= obj;

		$modalInstance.dismiss('cancel');
	};

});



//controller 2

app.controller('fieldController', function($scope,$rootScope,$http) {
	$rootScope.fields = [{
		name: '',


		length: '',
		nul: '',
		ai: '',
		indx:{ indexmodel:null,
			availableindexOptions: [
				{id: 'None', name: 'None'},
				{id: 'primary key', name: 'Primary Key'},
				{id:'unique key', name:'Unique Key'}

			]},

	}

	];


	$rootScope.rows = [{ field0: '', field1: '', field2: '', field3: '', field4: ''}];
	$rootScope.rowCount = {};




	$rootScope.addcol=function(){
		$rootScope.fields.push({});
		$rootScope.datatype.datamodel.push({});
		$rootScope.indextype.indexmodel.push({});
	}

	$rootScope.datatype= {datamodel:[{}],
		availableOptions:[
			{id: 'varchar', name: 'Varchar'},
			{id: 'char', name: 'Character'},
			{id: 'int', name: 'Integer'},
			{id: 'binary', name: 'Binary'},
			{id: 'bool', name: 'Boolean'}
		]};


	$rootScope.indextype={indexmodel:null,
		availableindexOptions: [
			{id: 'None', name: ''},
			{id: 'Primary Key', name: 'PRIMARY KEY'},
			{id:'Unique Key', name:'Unique Key'}

		]

	}




	/*$scope.newDemo = function(){
		var query='CREATE TABLE DEMO5 (id INTEGER not NULL,first VARCHAR(255),last VARCHAR(255),age INTEGER,PRIMARY KEY ( id ))';

		var URL = 'http://localhost:8080/api/table/create/query/';
		URL=URL+query;
		$http.get(URL).
		success(function() {
			console.log("table name created");
		});
	}*/


    $scope.createTb = function(){
        
        var values = $scope.fields;
        var len = values.length;
        console.log(len);
        
        var p = 'CREATE TABLE '+$scope.tableName+' ';
        p+='(';
        var q='';
        angular.forEach(values, function (value, key) {
            
            if(value.null==null){
                value.null='';
            }
            
            if(value.ai==null){
                value.ai='';
            }
            
            if(value.valueKey=='None'){
                value.valueKey='';
            }
            
            if(value.dataType!='int'){
               q+=value.name+" "+value.dataType+"("+value.length+")"+" "+value.null+" "+value.ai+" "+value.valueKey; 
            }else{
                q+=value.name+" "+value.dataType+" "+value.null+" "+value.ai+" "+value.valueKey; 
            }
            
            if(key!=(len-1)){
              q+=",";  
            }
            
            console.log('key '+key);
        });
        
        q=q+")";
       var query = p + q;
       console.log(query);
        
     
     /* var query='CREATE TABLE DEMO5 (id INTEGER not NULL,first VARCHAR(255),last VARCHAR(255),age INTEGER,PRIMARY KEY ( id ))';
         CREATE TABLE (ID int NOT NULL AUTO_INCREMENT Primary)
		var URL = 'http://localhost:8080/api/table/create/query/';
		URL=URL+query;
		$http.get(URL).
		success(function() {
			console.log("table name created");
		});    */
        
        var URL = 'http://localhost:8080/api/table/create/query/';
		URL=URL+query;
		$http.get(URL).
		success(function() {
			console.log("table name created");
		});
        
    };







});


/*app.controller('DropdownCtrl', ['$scope', function($scope) {
 $scope.data = {
 model: null,
 availableOptions: [
 {id: 'varchar', name: 'Varchar'},
 {id: 'char', name: 'Character'},
 {id: 'int', name: 'Integer'},
 {id: 'binary', name: 'Binary'},
 {id: 'bool', name: 'Boolean'}
 ],
 };
 }]);
 */










app.controller('demo', function($scope,$http)
{
	$scope.newTable = "new Table";

	$scope.newDemo = function(){
		var query='CREATE TABLE DEMO4 (id INTEGER not NULL,first VARCHAR(255),last VARCHAR(255),age INTEGER,PRIMARY KEY ( id ))';
		console.log("table name");
		var URL = 'http://localhost:8080/api/table/create/query/';
		URL=URL+query;
		$http.get(URL).
		success(function() {
			console.log("table name created");
		});
	}

});









app.controller('dbNameCtrl', function($scope,$http)
{
	
    
    
    $scope.createDb = function(){
        
        var query=$scope.dbName;
		
		var URL = 'http://localhost:8080/api/database/create/';
		URL=URL+query;
		$http.get(URL).
		success(function() {
			console.log('Create Database '+query);
		});
        
      
        
    };
    
    
    $scope.dummy = function(){
      
       
              var data = {
         db_name:'demo2'
        };

        var config = {
         params: '',
         headers : {'Accept' : 'application/json'}
        };

        $http.get("http://localhost:8080/api/database/create/demo2", config).then(function(response) {
           // process response here..
             console.log("Created Db :")
            console.log(response);
            
         }, function(response) {
           
        });
        
        
    };


});
app.controller('tableNameCtrl', ['$scope', function($rootscope)
{
	$rootscope.tableName='table name';


}]);



angular.module('dashyAngular').controller('columnSizeCtrl', ['$scope', function($rootscope)
{
	$rootscope.columnSize='';


}]);


