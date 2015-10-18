/*
	Gets the name of the weekday from a timestamp
*/

(function(){
	angular.module("factories")
		.factory("setWeekDay", function(){
			var setWeekDay = {};
			setWeekDay.setData = function(timestamp){
				var a = new Date(timestamp * 1000), 
					days = ["sun","mon","tue","wed","thu","fri","sat"];
				return days[a.getDay()];
			};
			return setWeekDay;
		});
})();
