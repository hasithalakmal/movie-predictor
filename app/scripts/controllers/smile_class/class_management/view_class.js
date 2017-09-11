'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_class', function ($scope, $http, $sce) {

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
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#stuSerchTableBody").append("<tr><td>" 
				+ response.data.result[i].clsId + "</td><td>" 
				+ response.data.result[i].clsName + "</td><td>" 
				+ response.data.result[i].subId.subName + "</td><td>" 
				+ response.data.result[i].clsTypeId.clsTypeName + "</td><td>" 
				+ response.data.result[i].clsDay + "</td><td>" 
				//+ response.data.result[i].clsTimePerod + "</td><td>" 
				+ response.data.result[i].teaId.teaName + "</td><td>"
				+ response.data.result[i].percentage + "</td><td>"
                + response.data.result[i].clsFee + "</td></tr>");
            }
            $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
            $("#studentSearchingTable").show();

        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };
});