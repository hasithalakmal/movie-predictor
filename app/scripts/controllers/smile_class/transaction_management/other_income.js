'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('other_income', function ($scope, $http) {
    $scope.formsinglesublitControleFlag = false;

    $scope.validationOptions = {
        rules: {
            description: {
                required: true,
            },
			salaryAmount: {
                required: true,
            }
        },
        messages: {
            description: {
                required: "Please Enter Description",
            },
			 salaryAmount: {
                required: "Please Enter Amount",
            }
        }
    };

    $scope.init = function () {
        $scope.salaryAmount = "";
        $scope.selected = "";
        $scope.description = "";
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/teacher'
        }).then(function successCallback(response) {
            $scope.tea_names_select1 = response.data.result;
			var teaObj = JSON.parse("{\"teaName\": \"None\",\"teaId\": 0}");
			$scope.tea_names_select1.push(teaObj);
			console.log($scope.tea_names_select1);
			$scope.tea_names_select = $scope.tea_names_select1;
            $scope.selected = response.data.result[0].teaId;
			$scope.reason = 0;
        }, function errorCallback(response) {
            swal('Error!','Something Wrong!','error');
        });
    };

	$scope.incomeTypeSelecter = function(){
		if($scope.reason==0){
			$scope.otherdesc = true;
			$scope.description ="";
		}else{
			$scope.otherdesc = false;
			if($scope.reason==1){
				$scope.description = "Photocopy charges";
			}else if($scope.reason==2){
				$scope.description = "Telephone Bill";
			}else if($scope.reason==3){
				$scope.description = "Publicity";
			}
		}
	};
	
    $scope.submit = function (form) {
        if (form.validate()) {
            if (!$scope.formsinglesublitControleFlag) {
                $scope.formsinglesublitControleFlag = true;
				if($scope.reason==0 && $scope.description.charAt(0)=="P" && $scope.description.charAt(1)=="h"){
					swal('Error!','Cant Start with Ph letters. It use for collect photocopy chargers!','error');
					$scope.formsinglesublitControleFlag = false;
				}else if($scope.reason==0 && $scope.description.charAt(0)=="G" && $scope.description.charAt(1)=="e"){
					swal('Error!','Cant Start with Ge letters. It use for collect salery!','error');
					$scope.formsinglesublitControleFlag = false;
				}else{
					$scope.data = {
						"Amount": $scope.salaryAmount,
						"teaid": $scope.selected,
						"description": $scope.description
					};
					$http({
						method: 'POST',
						url: 'http://localhost:8084/SmileClass/otherIncome',
						data: $scope.data
					}).then(function successCallback(response) {
						swal("Success!", "Other Income is Successfully Updated", "success");
						$scope.formsinglesublitControleFlag = false;
						$scope.init();
					}, function errorCallback(response) {
						swal('Error!','Something Wrong!','error');
						$scope.formsinglesublitControleFlag = false;
					});
				}
                
            }
        }
        ;
    };
});