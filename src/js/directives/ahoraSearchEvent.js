(function(){
	angular.module("directives")
		.directive("ahoraSearchEvent", ["animations", function(animations){
		    return {
		    	restrict : "A",
		        link: function ($scope, element, attrs) {
		        	var searchCancel = $("#search__cancel"),
						searchBar = $(".search__input"),
						data = $(".data"),
						search = $(".search"),
						summary = $(".summary");

					element.bind("click", function(){
						$(search).show();
						$(searchBar).val("");
						$(summary).css({"visibility":"hidden"}).fadeOut(500);
						$(data).addClass(animations.data.exit);
						setTimeout(function(){
							$(data).removeClass(animations.data.exit).hide();
						}, 500);
						setTimeout(function(){
							$(searchBar).addClass(animations.searchBar.enter).show().focus();
							setTimeout(function () { 
							    $(searchBar).removeClass(animations.searchBar.enter);
							}, 750);
							$(searchCancel).addClass(animations.searchCancel.enter).show();
							setTimeout(function () { 
							    $(searchCancel).removeClass(animations.searchCancel.enter);
							}, 1000);
						}, 500);
					});

		        }
		    };
		}]);
})();