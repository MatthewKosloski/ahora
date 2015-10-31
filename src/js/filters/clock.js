(function(){
	angular.module("filters")
		.filter("clock", function () {
	        return function (input, unit) {
	        	var hour = input.split(":")[0],
				    minute = input.split(":")[1];
	            if(unit === false) {
				    var parsedHour = parseInt(hour),
				        ext = (parsedHour < 12) ? "AM" : "PM";

				    if (parsedHour > 12) {
				        return (parsedHour - 12) + ":" + minute + " " + ext;
				    } else if (parsedHour === 0) {
				        return "12" + ":" + minute + " " + ext;
				    } else {
				        return hour + ":" + minute + " " + ext;
				    }
	            } else {
	            	return hour + ":" + minute;
	            }
	        };
		});
})();