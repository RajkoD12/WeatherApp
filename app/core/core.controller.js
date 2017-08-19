(function(){
	"use strict";

	var CoreController = function($scope, $http, $filter) {
		$scope.search;		// unos gradova iz inputa forme u formatu ime1,ime2,ime3...
		$scope.cities = [];		// lista svih gradova za prikaz, dobija se iz $scope.search
		$scope.weathers = [];		// lista svih rezultata, iz nje cemo izvlaciti jedan po jedan grad i prikazivati

		var url = "http://api.openweathermap.org/data/2.5/weather?q=";
		var apiKey = "appid=192bd17540c63ad9856465e8d077b2b8";

		$scope.getOneWeather = function(city) {
			$http.get(url + city + "&" + apiKey).then(function(response) {
				$scope.weather = response.data;
				$scope.date = new Date(0);		// datum koji cemo prikazati, posto ga izvlacimo iz response.data.dt koji je u formatu UTC sekundi, stavljamo na 0 pa povecamo za vrednost "dt"
				$scope.weather.main.temp = Math.floor(response.data.main.temp - 273.15);
				$scope.date.setUTCSeconds(response.data.dt);		// dodajemo UTC podatak "dt" nasem datumu za prikaz
				$scope.weathers.push($scope.weather);
			});
		};

		$scope.getWeather = function() {
			$scope.weathers = [];		// praznimo weathers pre nego sto preuzmemo nove podatke
			if($scope.search != null) {
				var novo = $scope.search.split(",").map(function(elem) {		// ono sto smo uneli ubacujemo u privremenu promenjivu koju koristimo za proveru duplikata
					return elem.trim();
				});
				for (var i = 0; i < novo.length - 1; i++) {		// provera da nemamo duple elemente u nizu
					for (var j = i + 1; j < novo.length; j++) {
						if (novo[i] == novo[j]) {
							novo.splice(j, 1);
							j--;		// ispravka kojom se omogucava da se ne preskoci ni jedan element niza tokom pretrage za duplikate
						}
					}
				}
				for (var i = 0; i < novo.length; i++) {		// provera da vec nismo uneli grad koji je prikazan
					if ($scope.cities.includes(novo[i])) {
						novo.splice(i, 1);
						i--;		// ispravka kojom se omogucava da se ne preskoci ni jedan element niza tokom pretrage za duplikate
					}
				}
				$scope.cities = $scope.cities.concat(novo);
			}		// sada u $scope.cities imamo sve gradove koje treba prikazati
			for(var i = 0; i < $scope.cities.length; i++) {
				//$scope.getOneWeather($scope.cities[i]);
				setTimeout($scope.getOneWeather($scope.cities[i]), 300);
			};
			console.log($scope.weathers);
			$scope.search = null;
		};

		$scope.removeCity = function(city) {
			for(var i = 0; i < $scope.weathers.length; i++) {
				if($scope.weathers[i].name == city) {
					$scope.weathers.splice(i, 1);
				}
			};
		}
	}

	angular.module("CoreModule").controller("CoreController", CoreController);

	angular.module("CoreModule").filter("capitalize", function() {
		return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	});

	angular.module("CoreModule").filter("dateFormat", function($filter) {
		var suffixes = ["th", "st", "nd", "rd"];
		return function(input) {
			var dtfilter = $filter('date')(input, 'MMMM dd');
			var day = parseInt(dtfilter.slice(-2));
			var relevantDigits = (day < 30) ? day % 20 : day % 30;
			var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
			return dtfilter+suffix;
		};
	});
})();