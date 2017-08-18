(function(){
	"use strict";

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/home");

		$stateProvider.state("home", {
			url: "/home",
			views: {
				"content@": {
					templateUrl: "app/core/weather.html",
					controller: "CoreController"
				}
			}
		});
	}

	angular.module("CoreModule").config(config);
	
})();