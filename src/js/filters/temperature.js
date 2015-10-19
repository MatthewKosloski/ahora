(function(){
	angular.module("filters")
		.filter("temperature", function () {
	        return function (input, unit) {
	            if(unit === "celcius") {
	                return Math.round((input - 32) * 5 / 9);
	            } else {
	                var cel = Math.round((input - 32) * 5 / 9);
	                return Math.round(cel * (9/5) + 32);
	            }
	        };
		});
})();