/*
	Attempts to get user's coordinates.  If permitted by user,
	it will save coordinates, else it will return an error
*/

(function(){
	angular.module("factories")
		.factory("getCoordinates", ["$q", function($q){
			var deferred = $q.defer();
			var getCoordinates = {};
			var geolocation = navigator.geolocation;
			getCoordinates.getData = function(){
				if (geolocation) {
		        	geolocation.getCurrentPosition(
		        		function(position) {
		          			var crd = position.coords;
		          			var coords = crd.latitude + "," + crd.longitude;
		          			deferred.resolve(coords);
		        		}, 
		        		function(error) {
		        			var errorMessage;
		        			switch(error.code) {
				                case error.PERMISSION_DENIED:
				                    errorMessage = "Please allow the use of geolocation services.";
				                    break;
				                case error.POSITION_UNAVAILABLE:
				                    errorMessage = "Location information is unavailable.";
				                    break;
				                case error.TIMEOUT:
				                    errorMessage = "The request to get user location timed out.";
				                    break;
				                case error.UNKNOWN_ERROR:
				                    errorMessage = "An unknown error occurred.";
				                    break;
		        			}
		        			deferred.reject(errorMessage);
		        		},
		        		{timeout: 10000}
		        	);
		      	} else {
		      		alert("Your browser doesn't support geolocation services.");
		      	}
		      	return deferred.promise;
			};
			return getCoordinates;
		}]);
})();