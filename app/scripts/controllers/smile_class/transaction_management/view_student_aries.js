'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_student_aries', function ($scope, $http) {
    $(document).ready(function () {
        $scope.cashacc = $("#CashAccountSearchResultByName").DataTable();
    });
	$scope.dateFormatter = function(inputdate){
		var date = new Date(inputdate);
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +   date.getDate();
	};
	$scope.init = function () {
		// Aries Account
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/student'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.cashacc.destroy();
            $('#cashSerchTableBody').empty();
            var i = 0;
            $scope.creditBal = 0;
            $scope.debitBal = 0;
            $scope.forwordBal = 0;
            for (i = 0; i < response.data.result.length; i++) {
				if(response.data.result[i].stuAccBal==0){
				
				}else if (response.data.result[i].stuAccBal < 0) {
                    $("#cashSerchTableBody").append("<tr><td>"
							+ response.data.result[i].stuId +"</td><td>"
                            + response.data.result[i].stuName  + "</td><td>"
                            + response.data.result[i].stuPhone1  + "</td><td>"
                            + "" + "</td><td>"
                            + (response.data.result[i].stuAccBal * -1)+ "</td></tr>");
                    $scope.creditBal = $scope.creditBal + (response.data.result[i].stuAccBal*-1);
                } else {
                    $("#cashSerchTableBody").append("<tr><td>"
							+ response.data.result[i].stuId  +"</td><td>"
                            +  response.data.result[i].stuName  + "</td><td>"
                            + response.data.result[i].stuPhone1+ "</td><td>"
                            + response.data.result[i].stuAccBal  + "</td><td>"
                            + "" + "</td></tr>");
                    $scope.debitBal = $scope.debitBal + response.data.result[i].stuAccBal;
                }
            }
            $scope.forwordBal = $scope.debitBal - $scope.creditBal
			if($scope.forwordBal >= 0){
				$scope.description ="Collectable Balance";
				
			}else{
				$scope.description ="Payable Balance";
				$scope.forwordBal =  $scope.forwordBal * -1;
			}
           /*  $("#cashSerchTableBody").append("<tr><td><b>"
					+ (i+1) +"</b></td><td><b>"
                    + $scope.dateFormatter(response.data.result[response.data.result.length - 1].cashAccStateChgDate) + "</b></td><td><b>"
                    + 'Total' + "</b></td><td><b>"
                    + $scope.debitBal + "</b></td><td><b>"
                    + $scope.creditBal + "</b></td></tr>");

            if ($scope.forwordBal >= 0) {
                $("#cashSerchTableBody").append("<tr><td><b>"
						+ (i+2) +"</b></td><td><b>"
                        + $scope.dateFormatter(response.data.result[response.data.result.length - 1].cashAccStateChgDate) + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + $scope.forwordBal + "</b></td><td><b>"
                        + "" + "</b></td></tr>");
            } else {
                $("#cashSerchTableBody").append("<tr><td><b>"
						+ (i+2) +"</b></td><td><b>"
                        + $scope.dateFormatter(response.data.result[response.data.result.length - 1].cashAccStateChgDate) + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + "" + "</b></td><td><b>"
                        + ($scope.forwordBal * -1) + "</b></td></tr>");
            }
 */
            $scope.cashacc = $("#CashAccountSearchResultByName").DataTable();
            $("#CashAccountSearchResultByName").show();
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
	};
});