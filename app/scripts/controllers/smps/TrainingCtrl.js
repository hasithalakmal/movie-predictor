'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('TrainingCtrl', function ($scope,$http) {
    $scope.read = function (workbook) {

        $scope.isShow = false;
        $(document).ready(function () {
            $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
        });

        var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
        var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);

        var isValidHeaderNames = true;
        // var succ = "duration" in headerNames;
        if( headerNames.indexOf("moveName") == -1 ) {
            swal('Error!','moveName is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("actorName") == -1 ) {
            swal('Error!','actorName is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("diretorName") == -1 ) {
            swal('Error!','diretorName is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("genre") == -1 ) {
            swal('Error!','genre is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("lanauge") == -1 ) {
            swal('Error!','lanauge is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("country") == -1 ) {
            swal('Error!','country is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("duration") == -1 ) {
            swal('Error!','duration is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("budget") == -1 ) {
            swal('Error!','budget is not contain!','error');
            isValidHeaderNames = false;
        }
        if( headerNames.indexOf("income") == -1 ) {
            swal('Error!','income is not contain!','error');
            isValidHeaderNames = false;
        }
        // if( headerNames.indexOf("isProfitable") == -1 ) {
        //     swal('Error!','isProfitable is not contain!','error');
        //     isValidHeaderNames = false;
        // }
        if(headerNames.length < 9 || headerNames.length > 10){
            swal('Error!','Invalid number of columns!','error');
            isValidHeaderNames = false;
        }
        //if contain  all valid fields then preparing data set
        if(isValidHeaderNames){
            console.log(headerNames);
            console.log(data);
            $scope.movieApiBaseURL = sessionStorage.getItem("movieAPIBaseURL");
            $http({
                method: 'POST',
                url:$scope.movieApiBaseURL+ 'row-data-set',
                data: data
            }).then(function successCallback(response) {
                console.log(response.data);

                $http({
                    method: 'GET',
                    url: $scope.movieApiBaseURL+'training-system'
                }).then(function successCallback(response1) {
                    console.log(response1);
                }, function errorCallback(response1) {
                    swal('Error!','Something Wrong on training!','error');
                });

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
                $scope.isShow = true;

                swal("Success!", "Class is Successfully Registered!", "success");
                $scope.formsinglesublitControleFlag = false;
            }, function errorCallback(response) {
                swal('error!', 'something wrong!', 'error');
                $scope.formsinglesublitControleFlag = false;
            });
        }
        // var err = "durationeffghh" in headerNames;
        // console.log(succ +" -- " + err);
        // for (var hedaderName in headerNames){
        //
        // }

        // for (var row in data)
        // {
        //     console.log(row);
        //     // Object.keys(data[row]).forEach(function(key) {
        //     //     console.log("Key = >" + key);
        //     //     console.log("Value => " + data[row][key]);
        //     //     console.log("===========================");
        //     // });
        // }
    }

    $scope.error = function (e) {
        console.log(e);
    }
});