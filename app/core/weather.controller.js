(function(){
	"use strict";

	var WeatherController = function($scope, $http, $filter, $window) {
		$scope.search;		// unos gradova iz inputa forme u formatu ime1,ime2,ime3...
		$scope.cities = [];		// lista svih gradova za prikaz, dobija se iz $scope.search
		$scope.weathers = [];		// lista svih objekata gradova koje prikazujemo

		var url = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=";
		var apiKey = "appid=192bd17540c63ad9856465e8d077b2b8";

		$("#input")		// ovde pozivamo getWeather kad god se u pretrazi pritisne enter ili se izgubi fokus
		.on("keydown", function(event) {
			if(event.which == 13) 
				$scope.getWeather();
		})
		.on("blur", function() {
			$scope.getWeather();
		});

		$scope.getOneWeather = function(city) {
			$http.get(url + city + "&" + apiKey).then(function(response) {
				console.log(response.data);		// primer responsea trenutnog vremena za jedan grad
				$scope.weather = response.data;
				$scope.date = new Date(0);		// datum koji cemo prikazati, posto ga izvlacimo iz response.data.dt koji je u formatu UTC sekundi, stavljamo na 0 pa povecamo za vrednost "dt"
				$scope.date.setUTCSeconds(response.data.dt);		// dodajemo UTC podatak "dt" nasem datumu za prikaz
				for (var i = 0; i < $scope.weathers.length; i++) {		// proveravamo da li je novi weather vec unet u niz weathers
					if ($scope.weathers[i].name.toUpperCase() == $scope.weather.name.toUpperCase())
						return;
				}
				$scope.weathers.push($scope.weather);
			});
		};

		$scope.getWeather = function() {
			//$scope.weathers = [];		// praznimo weathers pre nego sto preuzmemo nove podatke
			if($scope.search != null) {		//ako imamo nesto u search, ubacujemo to u cities koje cemo da prosledjujemo u getOneWeather, ako je prazan onda ne radimo nista
				$scope.cities = $scope.search.split(",").map(function(elem) {		// proveravamo da li ima duplikata u nasem unosu
					return elem.trim();
				});
				for (var i = 0; i < $scope.cities.length - 1; i++) {
					for (var j = i + 1; j < $scope.cities.length; j++) {
						if ($scope.cities[i] == $scope.cities[j]) {
							$scope.cities.splice(j, 1);
							j--;		// ispravka kojom se omogucava da se ne preskoci ni jedan element niza tokom pretrage za duplikate
						}
					}
				}
			} else return;	// sada u $scope.cities imamo sve nove gradove koje treba prikazati
			for(var i = 0; i < $scope.cities.length; i++) {
				//$scope.getOneWeather($scope.cities[i]);
				setTimeout($scope.getOneWeather($scope.cities[i]), 300);
			};
			//console.log($scope.weathers);
			$scope.search = null;
		};

		$scope.removeCity = function(city) {
			for(var i = 0; i < $scope.weathers.length; i++) {
				if($scope.weathers[i].name.toUpperCase() == city.toUpperCase()) {
					$scope.weathers.splice(i, 1);
				}
			};
		};

		$scope.openForecast = function(id) {
			$window.location.href = "#/forecast/" + id;
		};

		$scope.openMaps = function() {
			$window.location.href = "#/maps";
		}
	}

	angular.module("CoreModule").controller("WeatherController", WeatherController);

})();