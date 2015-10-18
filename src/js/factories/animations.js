/*
	Exports the names of used animations.
*/

(function(){
	angular.module("factories")
		.factory("animations", function(){
			return {
				searchBar : {
					enter : "animated bounceIn",
					exit : "animated bounceOut"
				},
				data : {
					enter : "animated bounceIn",
					exit : "animated fadeOutUp"
				},
				searchCancel : {
					enter : "animated flash",
					exit : "animated flash"
				},
				summary : {
					enter : "animated fadeInDown"
				}
			};
		});
})();
