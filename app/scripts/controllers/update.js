/**
 * Created by ASUS on 2016-08-14.
 */

'use strict';

angular.module('dashyAngular').controller('selectupdateTableCtrl', ['$scope', function($scope) {
    $scope.updatetables = [{id:'employee_details'}]

}]);

angular.module('dashyAngular').controller('EditableupdateTableCtrl', function($scope, $rootScope, $filter, $http, $q) {


         // filter rows to show
         $scope.filterUser = function(user) {
           return user.isDeleted !== true;
         };

         // mark user as deleted
         $scope.deleteUser = function(id) {
           var filtered = $filter('filter')($rootScope.rows, {id: id});
           if (filtered.length) {
             filtered[0].isDeleted = true;
           }
         };

         // add user
         $scope.addUser = function() {
           $rootScope.rows.push({

             field0: '',
             field1: null,
             field2: null,
             field3: '',
             field4: '',
             isNew: true
           });
         };

         // cancel all changes
         $scope.cancel = function() {
           for (var i = $rootScope.rows.length; i--;) {
             var user = $rootScope.rows[i];
             // undelete
             if (user.isDeleted) {
               delete user.isDeleted;
             }
             // remove new
             if (user.isNew) {
               $rootScope.rows.splice(i, 1);
             }
           };
         };

         // save edits
         $scope.saveTable = function() {
           var results = [];
           for (var i = $rootScope.rows.length; i--;) {
             var user = $rootScope.rows[i];
             // actually delete user
             if (user.isDeleted) {
               $rootScope.rows.splice(i, 1);
             }
             // mark as not new
             if (user.isNew) {
               user.isNew = false;
             }

             // send on server
             results.push($http.post('/saveUser', user));
           }

           return $q.all(results);
         };

         $scope.showField = function (id){
               return id < $rootScope.rowCount.length + 1;
         };

         $scope.print = function (){
               console.log($rootScope.rows[0].field0);
         };
});

angular.module('dashyAngular').controller('queryupdatePreviw', function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'queryUpdateModalContent.html',
            controller: 'dbModalInstanceCtrl123',
            size: size,
            scope: $scope,
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