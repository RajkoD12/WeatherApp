(function(){
	"use strict";

	/* filter za capitalize jedne reci */

	angular.module("CoreModule").filter("capitalize", function() {
		return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	});
	
	/* filter za capitalize svih reci u stringu */
	/*
	angular.module('CoreModule').filter('capitalize', function() {
		return function(input){
			if(input.indexOf(' ') !== -1){
				var inputPieces,
				i;

				input = input.toLowerCase();
				inputPieces = input.split(' ');

				for(i = 0; i < inputPieces.length; i++){
					inputPieces[i] = capitalizeString(inputPieces[i]);
				}

				return inputPieces.toString().replace(/,/g, ' ');
			}
			else {
				input = input.toLowerCase();
				return capitalizeString(input);
			}

			function capitalizeString(inputString){
				return inputString.substring(0,1).toUpperCase() + inputString.substring(1);
			}
		};
	});
	*/
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