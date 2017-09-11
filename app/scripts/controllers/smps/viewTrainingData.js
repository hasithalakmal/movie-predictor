'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('viewTrainingData', function ($scope, $http) {
    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
        $scope.stusertable1 = $("#StudentSearchResultByName1").DataTable({"scrollX": true});
        $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({"scrollX": true});
        $scope.stusertable3 = $("#StudentSearchResultByName3").DataTable({"scrollX": true});
    });

    $scope.init = function () {
        $scope.movieApiBaseURL = sessionStorage.getItem("movieAPIBaseURL");
        $http({
            method: 'GET',
            url: $scope.movieApiBaseURL+'row-data'
        }).then(function successCallback(response) {
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.length; i++) {
                $("#stuSerchTableBody").append("<tr><td>"
                    + response.data[i].rowDataId + "</td><td>"
                    + response.data[i].moveName + "</td><td>"
                    + response.data[i].diretorName + "</td><td>"
                    + response.data[i].actorName + "</td><td>"
                    + response.data[i].genre + "</td><td>"
                    + response.data[i].lanauge + "</td><td>"
                    + response.data[i].country + "</td><td>"
                    + response.data[i].duration + "</td><td>"
                    + response.data[i].budget + "</td><td>"
                    + response.data[i].income + "</td><td>"
                    + response.data[i].isProfitable + "</td></tr>");
            }
            $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
            $("#studentSearchingTable").show();

        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });

        //pre-processed data
        $http({
            method: 'GET',
            url: $scope.movieApiBaseURL+'pre-processed-data'
        }).then(function successCallback(response) {
            $scope.stusertable1.destroy();
            $('#stuSerchTableBody1').empty();
            var i = 0;
            for (i = 0; i < response.data.length; i++) {
                $("#stuSerchTableBody1").append("<tr><td>"
                    + response.data[i].rowDataId + "</td><td>"
                    + response.data[i].moveName + "</td><td>"
                    + response.data[i].diretorCategory.directorCategoryName + "</td><td>"
                    + response.data[i].actorCategory.actorCategoryName + "</td><td>"
                    + response.data[i].genre + "</td><td>"
                    + response.data[i].lanauge + "</td><td>"
                    + response.data[i].country + "</td><td>"
                    + response.data[i].durationCategory.duratonCategoryName + "</td><td>"
                    + response.data[i].durationCategory.duratonCategoryMin + "</td><td>"
                    + response.data[i].durationCategory.duratonCategoryMax + "</td><td>"
                    + response.data[i].budgetCategory.budgetCategoryName + "</td><td>"
                    + response.data[i].budgetCategory.budgetCategoryMin + "</td><td>"
                    + response.data[i].budgetCategory.budgetCategoryMax + "</td><td>"
                    + response.data[i].isProfitable + "</td></tr>");
            }
            $scope.stusertable1 = $("#StudentSearchResultByName1").DataTable({"scrollX": true});
            $("#studentSearchingTable1").show();

        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });

        //actor
        $http({
            method: 'GET',
            url: $scope.movieApiBaseURL+'actors'
        }).then(function successCallback(response) {
            $scope.stusertable2.destroy();
            $('#stuSerchTableBody2').empty();
            var i = 0;
            for (i = 0; i < response.data.length; i++) {
                $("#stuSerchTableBody2").append("<tr><td>"
                    + response.data[i].actorId + "</td><td>"
                    + response.data[i].actorName + "</td><td>"
                    + response.data[i].actorCategory.actorCategoryName + "</td></tr>");
            }
            $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({"scrollX": true});
            $("#studentSearchingTable2").show();

        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });


        //director
        $http({
            method: 'GET',
            url: $scope.movieApiBaseURL+'directors'
        }).then(function successCallback(response) {
            $scope.stusertable3.destroy();
            $('#stuSerchTableBody3').empty();
            var i = 0;
            for (i = 0; i < response.data.length; i++) {
                $("#stuSerchTableBody3").append("<tr><td>"
                    + response.data[i].directorId + "</td><td>"
                    + response.data[i].directorName + "</td><td>"
                    + response.data[i].directorCategory.directorCategoryName + "</td></tr>");
            }
            $scope.stusertable3 = $("#StudentSearchResultByName3").DataTable({"scrollX": true});
            $("#studentSearchingTable3").show();

        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });

    };
});