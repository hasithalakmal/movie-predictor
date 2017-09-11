'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('viewTrainingResult', function ($scope, $http) {

    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
        $scope.stusertable1 = $("#StudentSearchResultByName1").DataTable({"scrollX": true});
        $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({"scrollX": true});
        $scope.stusertable3 = $("#StudentSearchResultByName3").DataTable({"scrollX": true});
        $scope.stusertable4 = $("#StudentSearchResultByName4").DataTable({"scrollX": true});
        $scope.stusertable5 = $("#StudentSearchResultByName5").DataTable({"scrollX": true});
        $scope.stusertable6 = $("#StudentSearchResultByName6").DataTable({"scrollX": true});
    });

    $scope.init = function () {
        $scope.movieApiBaseURL = sessionStorage.getItem("movieAPIBaseURL");
        $http({
            method: 'GET',
            url: $scope.movieApiBaseURL + 'training-system'
        }).then(function successCallback(response) {

            var likelihoodTableList = response.data.likelihoodTables.listOfLikelihoodTables;


            //actor table build
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            var likelihoodTable = likelihoodTableList.ACTOR_ONE;
            var listOfLikelihoodRecode = likelihoodTable.listOfLikelihoodRecode;
            var i=1;
            for (var propertyKey in listOfLikelihoodRecode.valueOf()) {
                var isPropertyKeyAvailable = listOfLikelihoodRecode.hasOwnProperty(propertyKey);
                if (isPropertyKeyAvailable) {
                    var rowOfTable = listOfLikelihoodRecode[propertyKey];
                    $("#stuSerchTableBody").append("<tr><td>"
                            + i + "</td><td>"
                            + rowOfTable.property + "</td><td>"
                            + rowOfTable.numberOfPositiveResponse + "</td><td>"
                            + rowOfTable.numberOfNegativeResponse + "</td><td>"
                            + rowOfTable.criteriaProbability + "</td></tr>");
                    i++;
                }
            }
            $("#stuSerchTableBody").append("<tr><td>"
                +  i + "</td><td>"
                +  "Totals" + "</td><td>"
                + likelihoodTable.totalPositive + "</td><td>"
                + likelihoodTable.totalNegative + "</td><td>"
                + "" + "</td></tr>");
            i++;

            $("#stuSerchTableBody").append("<tr><td>"
                +  i + "</td><td>"
                +  "Probabilities" + "</td><td>"
                + likelihoodTable.positiveProbability + "</td><td>"
                + likelihoodTable.negativeProbability + "</td><td>"
                + "" + "</td></tr>");
            i++;


            $scope.stusertable = $("#StudentSearchResultByName").DataTable({"scrollX": true});
            $("#studentSearchingTable").show();






            //director table
            $scope.stusertable1.destroy();
            $('#stuSerchTableBody1').empty();
            var likelihoodTable = likelihoodTableList.DIRECTOR;
            var listOfLikelihoodRecode = likelihoodTable.listOfLikelihoodRecode;
            var i=1;
            for (var propertyKey in listOfLikelihoodRecode.valueOf()) {
                var isPropertyKeyAvailable = listOfLikelihoodRecode.hasOwnProperty(propertyKey);
                if (isPropertyKeyAvailable) {
                    var rowOfTable = listOfLikelihoodRecode[propertyKey];
                    $("#stuSerchTableBody1").append("<tr><td>"
                        + i + "</td><td>"
                        + rowOfTable.property + "</td><td>"
                        + rowOfTable.numberOfPositiveResponse + "</td><td>"
                        + rowOfTable.numberOfNegativeResponse + "</td><td>"
                        + rowOfTable.criteriaProbability + "</td></tr>");
                    i++;
                }
            }
            $("#stuSerchTableBody1").append("<tr><td>"
                +  i + "</td><td>"
                +  "Totals" + "</td><td>"
                + likelihoodTable.totalPositive + "</td><td>"
                + likelihoodTable.totalNegative + "</td><td>"
                + "" + "</td></tr>");
            i++;

            $("#stuSerchTableBody1").append("<tr><td>"
                +  i + "</td><td>"
                +  "Probabilities" + "</td><td>"
                + likelihoodTable.positiveProbability + "</td><td>"
                + likelihoodTable.negativeProbability + "</td><td>"
                + "" + "</td></tr>");
            i++;


            $scope.stusertable1 = $("#StudentSearchResultByName1").DataTable({"scrollX": true});
            $("#studentSearchingTable1").show();






            //GENRES
            $scope.stusertable2.destroy();
            $('#stuSerchTableBody2').empty();
            var likelihoodTable = likelihoodTableList.GENRES;
            var listOfLikelihoodRecode = likelihoodTable.listOfLikelihoodRecode;
            var i=1;
            for (var propertyKey in listOfLikelihoodRecode.valueOf()) {
                var isPropertyKeyAvailable = listOfLikelihoodRecode.hasOwnProperty(propertyKey);
                if (isPropertyKeyAvailable) {
                    var rowOfTable = listOfLikelihoodRecode[propertyKey];
                    $("#stuSerchTableBody2").append("<tr><td>"
                        + i + "</td><td>"
                        + rowOfTable.property + "</td><td>"
                        + rowOfTable.numberOfPositiveResponse + "</td><td>"
                        + rowOfTable.numberOfNegativeResponse + "</td><td>"
                        + rowOfTable.criteriaProbability + "</td></tr>");
                    i++;
                }
            }
            $("#stuSerchTableBody2").append("<tr><td>"
                +  i + "</td><td>"
                +  "Totals" + "</td><td>"
                + likelihoodTable.totalPositive + "</td><td>"
                + likelihoodTable.totalNegative + "</td><td>"
                + "" + "</td></tr>");
            i++;

            $("#stuSerchTableBody2").append("<tr><td>"
                +  i + "</td><td>"
                +  "Probabilities" + "</td><td>"
                + likelihoodTable.positiveProbability + "</td><td>"
                + likelihoodTable.negativeProbability + "</td><td>"
                + "" + "</td></tr>");
            i++;


            $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({"scrollX": true});
            $("#studentSearchingTable2").show();





            //LANGUAGE
            $scope.stusertable3.destroy();
            $('#stuSerchTableBody3').empty();
            var likelihoodTable = likelihoodTableList.LANGUAGE;
            var listOfLikelihoodRecode = likelihoodTable.listOfLikelihoodRecode;
            var i=1;
            for (var propertyKey in listOfLikelihoodRecode.valueOf()) {
                var isPropertyKeyAvailable = listOfLikelihoodRecode.hasOwnProperty(propertyKey);
                if (isPropertyKeyAvailable) {
                    var rowOfTable = listOfLikelihoodRecode[propertyKey];
                    $("#stuSerchTableBody3").append("<tr><td>"
                        + i + "</td><td>"
                        + rowOfTable.property + "</td><td>"
                        + rowOfTable.numberOfPositiveResponse + "</td><td>"
                        + rowOfTable.numberOfNegativeResponse + "</td><td>"
                        + rowOfTable.criteriaProbability + "</td></tr>");
                    i++;
                }
            }
            $("#stuSerchTableBody3").append("<tr><td>"
                +  i + "</td><td>"
                +  "Totals" + "</td><td>"
                + likelihoodTable.totalPositive + "</td><td>"
                + likelihoodTable.totalNegative + "</td><td>"
                + "" + "</td></tr>");
            i++;

            $("#stuSerchTableBody3").append("<tr><td>"
                +  i + "</td><td>"
                +  "Probabilities" + "</td><td>"
                + likelihoodTable.positiveProbability + "</td><td>"
                + likelihoodTable.negativeProbability + "</td><td>"
                + "" + "</td></tr>");
            i++;


            $scope.stusertable3 = $("#StudentSearchResultByName3").DataTable({"scrollX": true});
            $("#studentSearchingTable3").show();





            //COUNTRY
            $scope.stusertable4.destroy();
            $('#stuSerchTableBody4').empty();
            var likelihoodTable = likelihoodTableList.COUNTRY;
            var listOfLikelihoodRecode = likelihoodTable.listOfLikelihoodRecode;
            var i=1;
            for (var propertyKey in listOfLikelihoodRecode.valueOf()) {
                var isPropertyKeyAvailable = listOfLikelihoodRecode.hasOwnProperty(propertyKey);
                if (isPropertyKeyAvailable) {
                    var rowOfTable = listOfLikelihoodRecode[propertyKey];
                    $("#stuSerchTableBody4").append("<tr><td>"
                        + i + "</td><td>"
                        + rowOfTable.property + "</td><td>"
                        + rowOfTable.numberOfPositiveResponse + "</td><td>"
                        + rowOfTable.numberOfNegativeResponse + "</td><td>"
                        + rowOfTable.criteriaProbability + "</td></tr>");
                    i++;
                }
            }
            $("#stuSerchTableBody4").append("<tr><td>"
                +  i + "</td><td>"
                +  "Totals" + "</td><td>"
                + likelihoodTable.totalPositive + "</td><td>"
                + likelihoodTable.totalNegative + "</td><td>"
                + "" + "</td></tr>");
            i++;

            $("#stuSerchTableBody4").append("<tr><td>"
                +  i + "</td><td>"
                +  "Probabilities" + "</td><td>"
                + likelihoodTable.positiveProbability + "</td><td>"
                + likelihoodTable.negativeProbability + "</td><td>"
                + "" + "</td></tr>");
            i++;


            $scope.stusertable4 = $("#StudentSearchResultByName4").DataTable({"scrollX": true});
            $("#studentSearchingTable4").show();




            //BUDGET_ID
            $scope.stusertable5.destroy();
            $('#stuSerchTableBody5').empty();
            var likelihoodTable = likelihoodTableList.BUDGET_ID;
            var listOfLikelihoodRecode = likelihoodTable.listOfLikelihoodRecode;
            var i=1;
            for (var propertyKey in listOfLikelihoodRecode.valueOf()) {
                var isPropertyKeyAvailable = listOfLikelihoodRecode.hasOwnProperty(propertyKey);
                if (isPropertyKeyAvailable) {
                    var rowOfTable = listOfLikelihoodRecode[propertyKey];
                    $("#stuSerchTableBody5").append("<tr><td>"
                        + i + "</td><td>"
                        + rowOfTable.property + "</td><td>"
                        + rowOfTable.numberOfPositiveResponse + "</td><td>"
                        + rowOfTable.numberOfNegativeResponse + "</td><td>"
                        + rowOfTable.criteriaProbability + "</td></tr>");
                    i++;
                }
            }
            $("#stuSerchTableBody5").append("<tr><td>"
                +  i + "</td><td>"
                +  "Totals" + "</td><td>"
                + likelihoodTable.totalPositive + "</td><td>"
                + likelihoodTable.totalNegative + "</td><td>"
                + "" + "</td></tr>");
            i++;

            $("#stuSerchTableBody5").append("<tr><td>"
                +  i + "</td><td>"
                +  "Probabilities" + "</td><td>"
                + likelihoodTable.positiveProbability + "</td><td>"
                + likelihoodTable.negativeProbability + "</td><td>"
                + "" + "</td></tr>");
            i++;


            $scope.stusertable5 = $("#StudentSearchResultByName5").DataTable({"scrollX": true});
            $("#studentSearchingTable5").show();




            //DURATION
            $scope.stusertable6.destroy();
            $('#stuSerchTableBody6').empty();
            var likelihoodTable = likelihoodTableList.DURATION;
            var listOfLikelihoodRecode = likelihoodTable.listOfLikelihoodRecode;
            var i=1;
            for (var propertyKey in listOfLikelihoodRecode.valueOf()) {
                var isPropertyKeyAvailable = listOfLikelihoodRecode.hasOwnProperty(propertyKey);
                if (isPropertyKeyAvailable) {
                    var rowOfTable = listOfLikelihoodRecode[propertyKey];
                    $("#stuSerchTableBody6").append("<tr><td>"
                        + i + "</td><td>"
                        + rowOfTable.property + "</td><td>"
                        + rowOfTable.numberOfPositiveResponse + "</td><td>"
                        + rowOfTable.numberOfNegativeResponse + "</td><td>"
                        + rowOfTable.criteriaProbability + "</td></tr>");
                    i++;
                }
            }
            $("#stuSerchTableBody6").append("<tr><td>"
                +  i + "</td><td>"
                +  "Totals" + "</td><td>"
                + likelihoodTable.totalPositive + "</td><td>"
                + likelihoodTable.totalNegative + "</td><td>"
                + "" + "</td></tr>");
            i++;

            $("#stuSerchTableBody6").append("<tr><td>"
                +  i + "</td><td>"
                +  "Probabilities" + "</td><td>"
                + likelihoodTable.positiveProbability + "</td><td>"
                + likelihoodTable.negativeProbability + "</td><td>"
                + "" + "</td></tr>");
            i++;


            $scope.stusertable3 = $("#StudentSearchResultByName6").DataTable({"scrollX": true});
            $("#studentSearchingTable6").show();







        }, function errorCallback(response) {
            swal('Error!', 'Something Wrong!', 'error');
        });


    };
});