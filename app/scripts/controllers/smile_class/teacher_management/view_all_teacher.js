'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_all_teacher', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.stusertable = $("#TeacherSearchResultByName").DataTable();
    });

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/teacher'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#teaSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#teaSerchTableBody").append("<tr><td>" + response.data.result[i].teaId + "</td><td>"
                        + response.data.result[i].teaName + "</td><td>"
                        + response.data.result[i].teaAddress + "</td><td>" + response.data.result[i].teaQua + "</td><td>" + response.data.result[i].teaPhone1 + "</td><td>" + response.data.result[i].teaPhone2 + "</td><td>" + response.data.result[i].teaPhone3 + "</td></tr>");
            }
            $scope.stusertable = $("#TeacherSearchResultByName").DataTable();
            $("#studentSearchingTable").show();
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
});