(function(){
	"use strict";

	function config($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise("/weather");

		$stateProvider.state("main", {
			abstract: true,
			views: {
				"header": {
					templateUrl: "app/core/html/header.html"
				}
			}
		});

		$stateProvider.state("main.about", {
			url:"/about",
			views: {
				"content@": {
					templateUrl: "app/core/html/about.html"
				}
			}
		});

		$stateProvider.state("main.cities", {
			url: "/weather",
			views: {
				"content@": {
					templateUrl: "app/core/html/weather.html",
					controller: "WeatherController"
				}
			}
		});

		$stateProvider.state("main.forecast", {
			url: "/forecast/:id",
			views: {
				"content@": {
					templateUrl: "app/core/html/forecast.html",
					controller: "ForecastController",
					resolve: {
						id: function($stateParams) {
							return $stateParams.id;
						}
					}
				}
			}
		});

		$stateProvider.state("main.maps", {
			url: "/maps",
			views: {
				"content@": {
					templateUrl: "app/core/html/maps.html"
				}
			}
		});
	}

	angular.module("CoreModule").config(config);
	
})();