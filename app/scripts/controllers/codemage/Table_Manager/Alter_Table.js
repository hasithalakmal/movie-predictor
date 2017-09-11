'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('Alter_Table', function ($scope, $filter, $http) {
  $scope.users = []; 
  
  $scope.datatype = [
    {value: 'Varchar(45)', text: 'String'},
    {value: 'INT(11)', text: 'Integer'},
	{value: 'Double', text: 'Double'},
	{value: 'Float', text: 'Float'},
    {value: 'Date', text: 'Date'}
  ]; 

  

  $scope.showDataTypes = function(user) {
    var selected = [];
    if(user.datatype) {
      selected = $filter('filter')($scope.datatype, {value: user.datatype});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.saveUser = function(data, id, pk, nn, uq, ai) {
    //$scope.user not updated yet
    angular.extend(data, {id: id},{pk: pk}, {nn: nn}, {uq: uq}, {ai: ai});
	//console.log($scope.tblName);
	//console.log(data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      datatype: null,
      pk: false ,
	  nn : false,
	  uq : false,
	  ai :false
    };
    $scope.users.push($scope.inserted);
  };
  
  
  
  $scope.updateTable = function(){
	console.log($scope.users);
  };
  
  $scope.selectTableToAlter = function(){
	console.log($scope.dbName);
	console.log($scope.tblName);
  };

});