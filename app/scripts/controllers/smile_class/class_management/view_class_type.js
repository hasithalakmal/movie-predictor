'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_class_type', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.stusertable = $("#ClassTypeSearchResultByName").DataTable({});
    });

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#clsSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#clsSerchTableBody").append("<tr><td>" 
					+ response.data.result[i].clsTypeId + "</td><td>"
					+ response.data.result[i].clsTypeName + "</td><td>"
                    + response.data.result[i].mappedClassTypeName + "</td></tr>");
            }
            $scope.stusertable = $("#ClassTypeSearchResultByName").DataTable({});
            $("#classTypeSearchingTable").show();
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
});