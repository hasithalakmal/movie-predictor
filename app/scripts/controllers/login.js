'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular')
    .controller('LoginCtrl', function ($scope, $location, $http) {

        $scope.submit = function () {
            console.log($scope.user_name);
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
                if ($scope.user_name == "admin" && $scope.user_pw == "admin") {
                    $location.path('/dashboard/home');
                    sessionStorage.setItem("userLevel", "admin");
                    sessionStorage.setItem("movieAPIBaseURL", "http://localhost:8084/movie-predictor-api/");
                } else {
                    swal('Error!!!', 'Check Your User Name & Password.', 'error');
                }
                // $http({
                //     method: 'POST',
                //     url: 'http://localhost:8084/SmileClass/login',
                //     data: {
                //         "userName": $scope.user_name,
                //         "passWord": $scope.user_pw
                //     }
                // }).then(function successCallback(response) {
                // if(response.data.msg){
                // 	if(response.data.msg && response.data.result.usercategory =="admin"){
                // 		$location.path('/dashboard/home');
                // 		sessionStorage.setItem("userLevel", "admin");
                // 	}else if(response.data.msg && response.data.result.usercategory =="user"){
                // 		$location.path('/dashboard/home');
                // 		sessionStorage.setItem("userLevel", "user");
                // 	}else{
                // 		swal('Error!!!', 'Check Your User Name & Password.','error');
                // 	}
                // }else{
                // 	swal('Error!!!', 'Check Your User Name & Password.','error');
                // }
                //
                //     $scope.formsinglesublitControleFlag = false;
                // }, function errorCallback(response) {
                //     swal('Error!', 'Something Wrong!', 'error');
                //     $scope.formsinglesublitControleFlag = false;
                // });
            }


        }

    });
