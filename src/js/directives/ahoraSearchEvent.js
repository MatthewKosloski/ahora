(function(){
	angular.module("directives")
		.directive("ahoraSearchEvent", ["animations", function(animations){
		    return {
		    	restrict : "A",
		        link: function ($scope, element, attrs) {
		        	var searchCancel = $("#search__cancel"),
						searchBar = $(".search__input"),
						widget = $(".widget"),
						search = $(".search");

					element.bind("click", function(){
						$(search).show();
						$(searchBar).val("");
						$(widget).addClass(animations.widget.exit);
						setTimeout(function(){
							$(widget).removeClass(animations.widget.exit).hide();
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