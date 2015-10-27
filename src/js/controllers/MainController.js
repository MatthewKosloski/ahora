(function(){
	angular.module("controllers")
		.controller("MainController", ["$scope", "getCoordinates", "getQueryCoordinates", "getLocationData", "getPlaces", "getWeatherData", "setWeekDay", "setWeatherData", "localStorageService", function($scope, getCoordinates, getQueryCoordinates, getLocationData, getPlaces, getWeatherData, setWeekDay, setWeatherData, localStorageService) {
			$scope.status = "";
			$scope.dataLoaded = false;
			$scope.err = false;

			var promiseA = getCoordinates.getData();
			var promiseB = promiseA.then(function(response) {
				return getLocationData.getData(response, "latlng");
			}, function(error){
				$scope.status = error;
				$scope.err = true;
			});
			var promiseC = promiseB.then(function(response){
				var data = response.data;
				getPlaces.getData(data);
				return getPlaces.promise();
			});
			var promiseD = promiseC.then(function(response){
				/*
					If the localStorage item hasn't been set yet, set the default unit to user's country
					else, the unit is equal to the set ahoraUserUnit value
				*/
				if(localStorageService.get("ahoraUserUnit") === null) {
					$scope.unit = (/BS|BZ|KY|PW|AS|US|VI/.test(response.country)) ? "fahrenheit" : "celcius";
				} else {
					$scope.unit = localStorageService.get("ahoraUserUnit");
				}
				var coords = response.lat + "," + response.lng;
				$scope.city = response.city;
				return getWeatherData.getData(coords);
			});
			var promiseE = promiseD.then(function(response){				
				setWeatherData.setData(response);
				return setWeatherData.promise();
			});

			var promiseF = promiseE.then(function(response){
				for (var key in response) {
					if (response.hasOwnProperty(key)) {
				  		$scope[key] = response[key];
					}
				}
				$scope.dataLoaded = true;
			});
			$scope.query = function(city){
				$scope.dataLoaded = false;
				var promiseA = getLocationData.getData(city, "address");
				var promiseB = promiseA.then(function(response) {
					var crd = response.data.results[0].geometry.location;
					var coords = crd.lat + "," + crd.lng;
					return getLocationData.getData(coords, "latlng");
				});
				var promiseC = promiseB.then(function(response){
					var data = response.data;
					getPlaces.getData(data);
					return getPlaces.promise();
				});
				var promiseD = promiseC.then(function(response){
					var coords = response.lat + "," + response.lng;
					$scope.city = response.city;
					return getWeatherData.getData(coords);
				});
				var promiseE = promiseD.then(function(response){				
					setWeatherData.setData(response);
					return setWeatherData.promise();
				});

				var promiseF = promiseE.then(function(response){
					for (var key in response) {
						if (response.hasOwnProperty(key)) {
					  		$scope[key] = response[key];
						}
					}
					$scope.dataLoaded = true;
				});
			};
			$scope.getInclude = function() {
				return "./partials/" + $scope.icon + ".html";
			};
			$scope.setLocalUnit = function(unit) {
				if(unit === "c") {
					localStorageService.set("ahoraUserUnit", "celcius");
				} else if(unit === "f") {
					localStorageService.set("ahoraUserUnit", "fahrenheit");
				} else if(unit === "k") {
					localStorageService.set("ahoraUserUnit", "kelvin");
				}
			};
			$scope.setColors = function(arg){
				if($scope.icon === "clear-night" || $scope.icon === "partly-cloudy-night" && $scope.temperature >= 32 && $scope.temperature < 80) {
					$scope.splashColor = "#5B4ACF";
					return "night-" + arg;
				} else if($scope.icon === "clear-day" && $scope.temperature >= 80){
					$scope.splashColor = "#FB5650";
					return "sunny-" + arg;
				} else if($scope.icon === "rain" || $scope.icon === "hail" || $scope.icon === "sleet" || $scope.icon === "snow" || $scope.temperature < 32) {
					$scope.splashColor = "#3081FF";
					return "rain-" + arg; 
				} else {
					$scope.splashColor = "#0087C4";
					return "default-" + arg; 
				}
			};
			$scope.setThermometer = function(){
				if($scope.temperature <= 32) {
					return "low";
				} else if($scope.temperature > 32 && $scope.temperature < 50){
					return "medium-low";
				} else if($scope.temperature >= 50 && $scope.temperature < 80){
					return "medium-high";
				} else if($scope.temperature >= 80){
					return "high";
				}
			};
		}]);
})();