(function(){
	angular.module("factories")
		.factory("setWeatherData", ["$q", "setWeekDay", function($q, setWeekDay){
			var obj = {};
			var deferred = $q.defer();
			deferred.resolve(obj);
			var setWeatherData = {};
			setWeatherData.setData = function(weatherData){
				obj.forecast = [];
				var	data = weatherData.data,
					currently = data.currently,
					daily = data.daily.data,
					tomorrow = daily[0];

				var date = new Date(), utc = date.getTime() + (date.getTimezoneOffset() * 60000);
				var timeFromOffset = new Date(utc + (3600000 * data.offset));
				var hours = timeFromOffset.getHours(), minutes = timeFromOffset.getMinutes();
				var formattedMinutes = (parseInt(minutes) < 10) ? "0" + minutes : minutes;

				obj.icon = currently.icon;
				obj.temperature = Math.round(currently.temperature);
				obj.low = Math.round(tomorrow.temperatureMin);
				obj.high = Math.round(tomorrow.temperatureMax);
				obj.wind = Math.round(currently.windSpeed) + " " + "mph";
				obj.rain = Math.round(currently.precipProbability * 100);
				obj.humidity = Math.round(currently.humidity * 100);
				obj.theTime = hours + ":" + formattedMinutes;
				obj.hour = hours;
				
				for(var i = 1; i <= 5; i++) {
			 		obj.forecast.push(
					    {
					   		"icon": daily[i].icon,
					   		"low": Math.round(daily[i].temperatureMin),
					   		"high": Math.round(daily[i].temperatureMax),
					   		// if it's the next day, say "tom"; else get the week day from timestamp 
					   		"name": (i === 1) ? "tom" : setWeekDay.setData(daily[i].time)
					    }
			    	);
			 	}
			};
			setWeatherData.promise = function(){
				return deferred.promise;
			};
			return setWeatherData;
		}]);
})();