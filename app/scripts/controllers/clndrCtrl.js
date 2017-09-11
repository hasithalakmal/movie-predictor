'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
/*angular.module('dashyAngular').controller('calendarCtrl', function ($scope) {


   
   $scope.eventSources = [];
    
});*/

var app = angular.module('dashyAngular')
    .directive('dede',function(){
       return {
          templateUrl:'views/pages/dashboard/calendar.html?v='+window.app_version,
          restrict: 'E',
          replace: true,
       }
    });






var demo = angular.module('dashyAngular');

demo.controller("Ctrl",

    function Ctrl($scope) {
       $scope.model = {
          contacts: [{
             id: 1,
             name: " ",
             age:""
          }, {
             id: 2,
             name: "",
             age: ""
          }, {
             id: 3,
             name: "",
             age: ""
          }, {
             id: 4,
             name: "",
             age: ""
          }],
          selected: {}
       };

       // gets the template to ng-include for a table row / item
       $scope.getTemplate = function (contact) {
          if (contact.id === $scope.model.selected.id) return 'edit';
          else return 'display';
       };

       $scope.editContact = function (contact) {
          $scope.model.selected = angular.copy(contact);
       };

       $scope.saveContact = function (idx) {
          console.log("Saving contact");
          $scope.model.contacts[idx] = angular.copy($scope.model.selected);
          $scope.reset();
       };

       $scope.reset = function () {
          $scope.model.selected = {};
       };
        $scope.addNewRow = function () {
            $scope.model.contacts.push({});

        }
    });