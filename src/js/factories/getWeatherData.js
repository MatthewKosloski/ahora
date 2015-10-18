/*
	Gets the weather data for the coordinates provided
*/

(function(){
	angular.module("factories")
		.factory("getWeatherData", ["$http", function($http){
			var getWeatherData = {};
			getWeatherData.getData = function(coordinates){
				return $http.jsonp("https://api.forecast.io/forecast/e1ab2c9f6b96acf85206c6def727a48e/" + coordinates + "?callback=JSON_CALLBACK");
			};
			return getWeatherData;
		}]);
})();
