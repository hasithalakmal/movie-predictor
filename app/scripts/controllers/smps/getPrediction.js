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

    //youtube variables
    $scope.youtubePositive1 ="";
    $scope.youtubeNegative1 ="";
    $scope.youtubePrediction1 ="";
     $scope.youtubePositive2 ="";
    $scope.youtubeNegative2 ="";
    $scope.youtubePrediction2 ="";

    //My validation functions 
    
    //for letters_and_space_only - full name
    jQuery.validator.addMethod("letters_only", function(value, element) {
          return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
    }, "Letters only please"); 
    //for letters_and_space_only - full name
    jQuery.validator.addMethod("letters_and_space_only", function(value, element) {
          return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    }, "Letters only please"); 
    //for letters_and_space_fillstop_only - name with initials
    jQuery.validator.addMethod("letters_and_space_fulstop_only", function(value, element) {
          return this.optional(element) || /^[a-zA-Z.\s]+$/i.test(value);
    }, "Letters only please"); 
    //for phone number - land phone number/mobile phone number
    jQuery.validator.addMethod("phone_numbers", function(value, element) {
          return this.optional(element) || /^\(?0\d{2}\)?[\s\-]?\d{7}$/i.test(value);
    }, "Letters only please"); 
    //for NIC number 
    jQuery.validator.addMethod("nic_numbers", function(value, element) {
          return this.optional(element) || /^[0-9]{9}[vVxX]$/i.test(value);
    }, "Letters only please"); 

    $scope.validationOptions = {
        rules: {
            moveName: {
                required: true
            },
            diretorName: {
                required: true,
                letters_and_space_fulstop_only:true
            },
            actorName: {
                required: true,
                letters_and_space_fulstop_only:true
            },
            genre: {
                required: true,
                letters_and_space_fulstop_only:true
            },
            budget: {
                required: true,
                number:true
            },
            lanauge: {
                required: true,
                letters_only:true
            },
            country: {
                required: true,
                letters_only:true
            },
            duration: {
                required: true,
                number:true,
                min:10,
                max:1000
            }
        },
        messages: {
            moveName: {
                required: "Please Enter moveName. This is required."
            },
            diretorName: {
                required: "Please Enter diretorName. This is required.",
                letters_and_space_fulstop_only:"Should contain only letters spaces and fullstop"
            },
            actorName: {
                required: "Please Enter actorName. This is required.",
                letters_and_space_fulstop_only:"Should contain only letters spaces and fullstop"
            },
            genre: {
                required: "Please Enter genre. This is required.",
                letters_and_space_fulstop_only:"Should contain only letters spaces and fullstop"
            },
            budget: {
                required: "Please Enter budget. This is required.",
                number:"Should Contain number only"
            },
            lanauge: {
                required: "Please Enter language. This is required.",
                letters_only:"Should contain only letters"
            },
            country: {
                required: "Please Enter country. This is required.",
                letters_only:"Should contain only letters"
            },
            duration: {
                required: "Please Enter duration. This is required.",
                number:"Should Contain number only",
                min:"Number of minutes should be greater than 10",
                max:"Number of minutes should be less than 1000"
            }
        },
    };

    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                $scope.movieApiBaseURL = sessionStorage.getItem("movieAPIBaseURL");
                $scope.youtubeAPI1URL = sessionStorage.getItem("youtubeAPI1URL");
                $scope.youtubeAPI2URL = sessionStorage.getItem("youtubeAPI2URL");

                //call movie API
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
                    var cartResult = response.data.cartResult;
                    $scope.positiveProbability = niveByarseResult.positiveProbability;
                    $scope.negativeProbability = niveByarseResult.negativeProbability;
                    if($scope.positiveProbability>0.5){
                        $scope.prediction = "Profitable";
                    }else {
                        $scope.prediction = "Loss";
                    }
                    $scope.resultPannal = true;
                    $scope.formsinglesublitControleFlag = false;

                    if(cartResult.result){
                        $scope.cartprediction = "Loss";
                    }else {
                        $scope.cartprediction = "Profitable";
                    }
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });






                if($scope.movieTrailer != '' || $scope.movieTrailer != null){
                    //call Youtube API - 1
                    $http({
                        method: 'GET',
                        url: $scope.youtubeAPI1URL + $scope.movieTrailer
                    }).then(function successCallback(response) {
                        var youtube1Result = response.data;
                        $scope.youtubePositive1 = youtube1Result.pos;
                        $scope.youtubeNegative1 = youtube1Result.neg;

                        if(youtube1Result.overall){
                            $scope.youtubePrediction1  = "Profitable";
                        }else {
                             $scope.youtubePrediction1 = "Loss";
                        }
                    }, function errorCallback(response) {
                        swal('Error!', 'Something Wrong!', 'error');
                        $scope.formsinglesublitControleFlag = false;
                    });
                }

                


                //call Youtube API - 2
                $http({
                    method: 'GET',
                    url: $scope.youtubeAPI2URL + $scope.moveName
                }).then(function successCallback(response) {
                    var youtube2Result = response.data;
                    $scope.youtubePositive2 = youtube2Result.pos;
                    $scope.youtubeNegative2 = youtube2Result.neg;

                    if(youtube2Result.overall){
                        $scope.youtubePrediction2  = "Profitable";
                    }else {
                         $scope.youtubePrediction2 = "Loss";
                    }
                }, function errorCallback(response) {
                    swal('Error!', 'Something Wrong!', 'error');
                    $scope.formsinglesublitControleFlag = false;
                });












            }
        };

    };
});