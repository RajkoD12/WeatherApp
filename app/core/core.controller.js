(function(){
	"use strict";

	var CoreController = function($scope, $http, $filter) {
		$scope.search;		// unos gradova iz inputa forme u formatu ime1,ime2,ime3...
		$scope.cities = [];		// lista svih gradova za prikaz, dobija se iz $scope.search
		$scope.weathers = [];		// lista svih rezultata, iz nje cemo izvlaciti jedan po jedan grad i prikazivati

		var url = "http://api.openweathermap.org/data/2.5/weather?q=";
		var apiKey = "appid=192bd17540c63ad9856465e8d077b2b8";

		$scope.getOneWeather = function(city) {		// funkcija za dobijanje vremena jednog grada
			$http.get(url + city + "&" + apiKey).then(function(response) {
				//console.log(response.data);
				$scope.weather = response.data;		// ovo su podaci o vremenu za grad koji smo trazili
				$scope.date = new Date(0);		// datum koji cemo prikazati, posto ga izvlacimo iz response.data.dt koji je u formatu UTC sekundi, stavljamo na 0 pa povecamo za vrednost "dt"
				$scope.weather.main.temp = Math.floor(response.data.main.temp - 273.15);		// temperatura za prikaz, konverzija kelvina u celzijuse
				$scope.date.setUTCSeconds(response.data.dt);		// dodajemo UTC podatak "dt" nasem datumu za prikaz
				$scope.weathers.push($scope.weather);		// u weathers ubacujemo nase podatke o vremenu za trazeni grad
			});
		};

		$scope.getWeather = function() {		// funkcija za dobijanje vremena za sve gradove
			$scope.weathers = [];		// praznimo weathers pre nego sto preuzmemo nove podatke
			if($scope.search != null) {		// ako nemamo nista u pretrazi, ne menjamo prikaz (za menjanje prikaza cemo koristiti removeCity())
				var novo = $scope.search.split(",").map(function(elem) {
					return elem.trim();
				});		// podelimo nas niz gradova po znaku odvajanja "," i radimo trim() na svaki element da bi odsekli razmake
				$scope.cities = $scope.cities.concat(novo);
			}
			//console.log($scope.cities);
			for(var i = 0; i < $scope.cities.length; i++) {
				/*setTimeout(*/$scope.getOneWeather($scope.cities[i])/*, 300)*/;		// pri pozivanju vise gradova ponekad mesaju podaci, npr prikaze se dva puta isti grad, pa sam stavio timeout da ne dodje do preklapanja
			};
			$scope.search = null;		// kada se prikazu vremena gradova, praznimo search, ovaj deo pomaze pri koriscenju removeCity()
		};

		$scope.removeCity = function(city) {
			for(var i = 0; i < $scope.cities.length; i++) {
				if($scope.cities[i] == city) {		// u nizu gradova pronadjemo grad koji smo prosledili i izbrisemo ga sa liste
					$scope.cities.splice(i, 1);
				}
			};
			$scope.getWeather();		// na kraju pozivamo novo icrtavanje vremena, a sada je $scope.search prazan tako da ce nam se iscrtati svi raniji gradovi BEZ obrisanog grada
		}		// ovo sve se moglo uraditi i bez brisanja sa liste i ponovog zvanja funkcije getWeather(), npr da se stavi ng-hide na elemente koje treba sakriti, ovo mi deluje bolje
	}

	angular.module("CoreModule").controller("CoreController", CoreController);

	angular.module("CoreModule").filter("capitalize", function() {
		return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	});		// filter za prvo veliko slovo kopiran sa stackoverflow

	angular.module("CoreModule").filter("dateFormat", function($filter) {
		var suffixes = ["th", "st", "nd", "rd"];
		return function(input) {
			var dtfilter = $filter('date')(input, 'MMMM dd');
			var day = parseInt(dtfilter.slice(-2));
			var relevantDigits = (day < 30) ? day % 20 : day % 30;
			var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
			return dtfilter+suffix;
		};
	});		// filter za redne brojeve kopiran sa stackoverflow
})();