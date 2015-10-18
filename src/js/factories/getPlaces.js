/*
	Gets the user's city and country from the coordinates provided
*/

(function(){
	angular.module("factories")
		.factory("getPlaces", ["$q", function($q){
			var data = {};
			var deferred = $q.defer();
			deferred.resolve(data);
			var getPlaces = {};
			getPlaces.getData = function(locationData){
				var crd = locationData.results[0].geometry.location;
				data.lat = crd.lat;
				data.lng = crd.lng;
				var address = locationData.results[0].address_components;

				// Gets the city name of the user
				for(var i = address.length - 1; i >= 0; i--) {
			    	if(address[i].types.indexOf("locality") !== -1) {
			      		data.city = address[i].long_name;
			      	}
			    }
			    /*
					Gets the abbreviation of the country of the user.
					This is used for setting the default unit (fah or cel)
			    */
			    for(var j = 0; j < address.length; j++) {
			        if(address[j].types[0] === "country") {
			            data.country = address[j].short_name;
			        } else if(address[j].types.length === 2) {
			            if(address[j].types[0] === "political") {
			            	data.country = address[j].short_name;
			            }
			        }
			    }
			};
			getPlaces.promise = function(){
				return deferred.promise;
			};
			return getPlaces;
		}]);
})();
