(function(){
	"use strict";

	function ForecastController($scope, $http, country, city) {
		$scope.forecasts;		// ovde smestamo ceo result

		var url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
		var apiKey = "appid=192bd17540c63ad9856465e8d077b2b8";

		$scope.getForecast = function() {
			$http.get(url + city + "," + country + "&" + apiKey).then(function(response) {
				console.log(response.data);		// primer responsea za jedan grad za 5 dana
				$scope.forecasts = response.data;
			});
		};

		$scope.getForecast();
	}

	angular.module("CoreModule").controller("ForecastController", ForecastController)
})();