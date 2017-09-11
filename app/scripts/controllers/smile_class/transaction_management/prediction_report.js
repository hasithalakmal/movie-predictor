'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('prediction_report', function ($scope, $http) {
	$(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
    });

    $('button').on('click', function () {
        var divToPrint = document.getElementById("printTable");
        var newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    });
    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/full-prediction-report'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            $scope.totalHaveToCollect =0.00;
            $scope.totalAlredyCollect =0.00;
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                var havetoCollectAmount = parseFloat(response.data.result[i].havetoCollectAmount);
                var alredyCollectAmount = parseFloat(response.data.result[i].alredyCollectAmount);
                var total = havetoCollectAmount+alredyCollectAmount;
                $scope.totalHaveToCollect = $scope.totalHaveToCollect + havetoCollectAmount;
                $scope.totalAlredyCollect = $scope.totalAlredyCollect + alredyCollectAmount;

                $("#stuSerchTableBody").append("<tr><td>" 
                + response.data.result[i].recodeId + "</td><td>" 
                + response.data.result[i].description + "</td><td>" 
                + response.data.result[i].havetoCollectAmount + "</td><td>" 
                + response.data.result[i].alredyCollectAmount + "</td><td>" 
                + total+ "</td></tr>");
            }
            $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
            $("#studentSearchingTable").show();

        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
       
});