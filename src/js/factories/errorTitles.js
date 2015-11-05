/*
	Returns a random, fun error title! <3
*/

(function(){
	angular.module("factories")
		.factory("errorTitles", function(){
			var titles = ["Oh no!", "Oh noes!", "Whoops!", "Crap!", "Oops!", "Ugh.", "GASP!", "Uhh.."];
			return titles[Math.floor(Math.random()*titles.length)];
		});
})();
