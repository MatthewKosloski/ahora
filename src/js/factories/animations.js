/*
	Exports the names of used animations.
*/

(function(){
	angular.module("factories")
		.factory("animations", function(){
			return {
				searchBar : {
					enter : "animated fadeInUp",
					exit : "animated fadeOutDown"
				},
				widget : {
					enter : "animated fadeInDown",
					exit : "animated fadeOutUp"
				},
				searchCancel : {
					enter : "animated flash",
					exit : "animated flash"
				}
			};
		});
})();
