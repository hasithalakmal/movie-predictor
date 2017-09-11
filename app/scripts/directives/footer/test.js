'use strict';

angular.module('dashyAngular')
	.controller('IgorController', ['$scope', function($scope,$sce, $compileProvider) {
	  $scope.testHtml = "<form><div class=\"form-group\"><label>Enter sid address</label><input type=\"text\" ng-model=\"sid\" class=\"form-control\"></div><div class=\"form-group\"><label>Enter sname address</label><input type=\"text\" ng-model=\"sname\" class=\"form-control\"></div></form>";
	}])
	.directive('test',function(){
		return {
        templateUrl:'scripts/directives/footer/test.html?v='+window.app_version,
        restrict: 'E',
        replace: true,
    	}
	});


