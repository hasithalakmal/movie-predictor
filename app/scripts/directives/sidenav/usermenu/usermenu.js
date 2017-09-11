'use strict';

angular.module('dashyAngular')
	.directive('usermenu',function(){
		return {
	        templateUrl:'scripts/directives/sidenav/usermenu/usermenu.html?v='+window.app_version,
	        restrict: 'E',
	        replace: true,

        	controller: function($scope){

	        	$scope.selectedMenu = 'dashboard';
				$scope.showingSubNav = 0;

				$scope.showSubNav = function(x){

									if(x==$scope.showingSubNav)
						$scope.showingSubNav = 0;
					else
						$scope.showingSubNav = x;


				};				
				

	        },
    	}
	});