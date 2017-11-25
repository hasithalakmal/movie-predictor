'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('TestController', function ($scope, $http) {
    $scope.read = function (workbook) {

        $scope.isShow = false;
        $(document).ready(function () {
            $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
        });

        var headerNames = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header: 1})[0];
        var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        var isValidHeaderNames = true;
        // var succ = "duration" in headerNames;
        if (headerNames.indexOf("moveName") == -1) {
            swal('Error!', 'moveName is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("actorName") == -1) {
            swal('Error!', 'actorName is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("diretorName") == -1) {
            swal('Error!', 'diretorName is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("genre") == -1) {
            swal('Error!', 'genre is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("lanauge") == -1) {
            swal('Error!', 'lanauge is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("country") == -1) {
            swal('Error!', 'country is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("duration") == -1) {
            swal('Error!', 'duration is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("budget") == -1) {
            swal('Error!', 'budget is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("income") == -1) {
            swal('Error!', 'income is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.indexOf("isProfitable") == -1) {
            swal('Error!', 'isProfitable is not contain!', 'error');
            isValidHeaderNames = false;
        }
        if (headerNames.length !== 10) {
            swal('Error!', 'Invalid number of columns!', 'error');
            isValidHeaderNames = false;
        }
        //if contain  all valid fields then preparing data set
        if (isValidHeaderNames) {
            console.log(headerNames);
            console.log(data);
            $scope.movieApiBaseURL = sessionStorage.getItem("movieAPIBaseURL");
            $http({
                method: 'POST',
                url: $scope.movieApiBaseURL + 'test-accuracy',
                data: data
            }).then(function successCallback(response) {
                var result = response.data.niveBayearsTestResult;
                var result2 = response.data.cartTestResult;

                $scope.stusertable.destroy();
                $('#stuSerchTableBody').empty();
                $("#stuSerchTableBody").append(
                    "<tr><td> Total Training Data set </td><td>"+ result.totalTrainingDataset + "</td></tr>"
                    +"<tr><td> Total Positives In Training Dataset </td><td>"+ result.totalPositivesInTrainingDataset + "</td></tr>"
                    +"<tr><td> Total Negatives In Training Dataset </td><td>"+ result.totalNegativesInTrainingDataset + "</td></tr>"
                    +"<tr><td> Total Test Dataset </td><td>"+ result.totalTestDataset + "</td></tr>"
                    +"<tr><td> Total Positives In Test Dataset </td><td>"+ result.totalPositivesInTestDataset + "</td></tr>"
                    +"<tr><td> Total Negatives In Test Dataset </td><td>"+ result.totalNegativesInTestDataset + "</td></tr>"

                    +"<tr><td> Total False Positive Count - Naive </td><td>"+ result.totalFalsePositiveCount + "</td></tr>"
                    +"<tr><td> Total False Negative Count - Naive </td><td>"+ result.totalFalseNegativeCount + "</td></tr>"
                    +"<tr><td> Total Unsuccess Count - Naive</td><td>"+ result.totalUnsuccessCount + "</td></tr>"
                    +"<tr><td> Un success Probability - Naive</td><td>"+ result.unsuccessProbability + "</td></tr>"
                    +"<tr><td> Total Success Positive Count - Naive </td><td>"+ result.totalSuccessPositiveCount + "</td></tr>"
                    +"<tr><td> Total Success Negative Count - Naive</td><td>"+ result.totalSuccessNegativeCount + "</td></tr>"
                    +"<tr><td> Total Success Count - Naive</td><td>"+ result.totalSuccessCount + "</td></tr>"
                    +"<tr><td> Success Probability - Naive</td><td>"+ result.successProbability + "</td></tr>"

                    +"<tr><td> Total False Positive Count - Cart </td><td>"+ result2.totalFalsePositiveCount + "</td></tr>"
                    +"<tr><td> Total False Negative Count - Cart </td><td>"+ result2.totalFalseNegativeCount + "</td></tr>"
                    +"<tr><td> Total Unsuccess Count - Cart</td><td>"+ result2.totalUnsuccessCount + "</td></tr>"
                    +"<tr><td> Un success Probability - Cart</td><td>"+ result2.unsuccessProbability + "</td></tr>"
                    +"<tr><td> Total Success Positive Count - Cart </td><td>"+ result2.totalSuccessPositiveCount + "</td></tr>"
                    +"<tr><td> Total Success Negative Count - Cart</td><td>"+ result2.totalSuccessNegativeCount + "</td></tr>"
                    +"<tr><td> Total Success Count - Cart</td><td>"+ result2.totalSuccessCount + "</td></tr>"
                    +"<tr><td> Success Probability - Cart</td><td>"+ result2.successProbability + "</td></tr>"
                );



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