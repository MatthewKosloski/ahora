/*	
	Takes coordinates of user's location, and gets 
	location data from google's geolocation api
*/

(function(){
	angular.module("factories")
		.factory("getQueryCoordinates", ["$http", function($http){
			var getQueryCoordinates = {};
			getQueryCoordinates.getData = function(input, typeOfInput){
				return $http({
					method : "GET",
					url : "https://maps.googleapis.com/maps/api/geocode/json?" + typeOfInput + "=" + input
				});
			};
			return getQueryCoordinates;
		}]);
})();