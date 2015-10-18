(function(){
	angular.module("controllers")
		.controller("MainController", ["$scope", "getCoordinates", "getQueryCoordinates", "getLocationData", "getPlaces", "getWeatherData", "setWeekDay", "setWeatherData", function($scope, getCoordinates, getQueryCoordinates, getLocationData, getPlaces, getWeatherData, setWeekDay, setWeatherData) {
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
		}]);
})();