(function(){
	angular.module("filters")
		.filter("temperature", function () {
	        return function (input, unit) {
	        	var cel = Math.round((input - 32) * 5 / 9), 
	        		ref = 273.15;
	            if(unit === "celcius") {
	                return Math.round((input - 32) * 5 / 9);
	            } else if(unit === "fahrenheit") {
	                return Math.round(cel * (9/5) + 32);
	            } else if(unit === "kelvin") {
	                return Math.round(cel + ref);
	            }
	        };
		});
})();