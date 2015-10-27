(function(){
	angular.module("filters")
		.filter("windSpeed", function(){
			return function(input, unit) {
	            var ref = 1.609344;
	        	if(unit === "celcius" || unit === "kelvin") {
	                return Math.round(input.split(" ")[0] * ref) + " " + "km/h";
	            } else {
	            	var kmh = Math.round(input.split(" ")[0] * ref);
	                return Math.round(kmh / ref) + " " + "mph"; 
	            }
	        };
   		});
})();