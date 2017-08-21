(function(){
	"use strict";

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/weather");

		$stateProvider.state("main", {
			abstract: true,
			views: {
				"header": {
					templateUrl: "app/core/header.html"
				}
			}
		});

		$stateProvider.state("main.home", {
			url: "/weather",
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