(function(){
	"use strict";

	function ForecastController($scope, $http, id) {
		$scope.forecasts;		// ovde smestamo ceo result
		// pretragu radimo preko ID-a grada koji je jedinstven
		var url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&id=";
		var apiKey = "appid=192bd17540c63ad9856465e8d077b2b8";

		$scope.getForecast = function() {
			$http.get(url + id + "&" + apiKey).then(function(response) {
				console.log(response.data);		// primer responsea za jedan grad za 5 dana
				$scope.forecasts = response.data;
				for (var i = 0; i < $scope.forecasts.list.length; i++) {  // podesavamo vreme pojedinacnih forecasta (server nam vraca format UTC sekundi)
					var date = new Date(0);
					date.setUTCSeconds($scope.forecasts.list[i].dt);
					$scope.forecasts.list[i].dt_date = date;
				}
			});
		};

		$scope.getForecast();
	}

	angular.module("CoreModule").controller("ForecastController", ForecastController)
})();