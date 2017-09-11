'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('getPrediction', function ($scope, $http ) {

    $scope.resultPannal = false;
    $scope.positiveProbability ="";
    $scope.negativeProbability ="";
    $scope.prediction ="";

    $scope.validationOptions = {
        rules: {
            moveName: {
                required: true
            },
            diretorName: {
                required: true
            },
            actorName: {
                required: true
            },
            genre: {
                required: true
            },
            budget: {
                required: true
            },
            lanauge: {
                required: true
            },
            country: {
                required: true
            },
            duration: {
                required: true
            }
        },
        messages: {
            moveName: {
                required: "Please Enter moveName. This is required."
            },
            diretorName: {
                required: "Please Enter diretorName. This is required."
            },
            actorName: {
                required: "Please Enter actorName. This is required."
            },
            genre: {
                required: "Please Enter genre. This is required."
            },
            budget: {
                required: "Please Enter budget. This is required."
            },
            lanauge: {
                required: "Please Enter language. This is required."
            },
            country: {
                required: "Please Enter country. This is required."
            },
            duration: {
                required: "Please Enter duration. This is required."
            }
        },
    };

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                $scope.movieApiBaseURL = sessionStorage.getItem("movieAPIBaseURL");
                $http({
                    method: 'POST',
                    url: $scope.movieApiBaseURL + 'predict',
                    data: {
                        "moveName": $scope.moveName,
                        "duration":  $scope.duration,
                        "diretorName":  $scope.diretorName,
                        "actorName":  $scope.actorName,
                        "genre":  $scope.genre,
                        "budget":  $scope.budget,
                        "lanauge":  $scope.lanauge,
                        "country":  $scope.country
                    }

                }).then(function successCallback(response) {
                    var niveByarseResult = response.data.niveByarseResult;
                    $scope.positiveProbability = niveByarseResult.positiveProbability;
                    $scope.negativeProbability = niveByarseResult.negativeProbability;
                    if($scope.positiveProbability>0.5){
                        $scope.prediction = "Profitable";
                    }else {
                        $scope.prediction = "Loss";
                    }
                    $scope.resultPannal = true;
                    $scope.formsinglesublitControleFlag = false;
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });
            }
        };

    };
});