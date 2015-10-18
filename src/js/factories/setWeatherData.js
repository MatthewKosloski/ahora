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
				var prefix, summary = (currently.summary).toLowerCase();
				if( /rain|sleet|snow|wind|precipitation|(fog)(?!gy)|humidity/i.test(summary) ) {
					prefix = "there\'s";
				} else if(/overcast/i.test(summary)){
					prefix = "there\'s an";
				} else if(/drizzle/i.test(summary)){
					prefix = "there\'s a";
				} else {
					prefix = "it\'s";
				}
				obj.summary = prefix + " " + summary;
				obj.icon = currently.icon;
				obj.temperature = Math.round(currently.temperature);
				obj.low = Math.round(tomorrow.temperatureMin);
				obj.high = Math.round(tomorrow.temperatureMax);
				obj.wind = Math.round(currently.windSpeed);
				obj.rain = Math.round(currently.precipProbability * 100);
				obj.humidity = Math.round(currently.humidity * 100);
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