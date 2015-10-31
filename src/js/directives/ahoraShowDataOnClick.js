(function(){
	angular.module("directives")
		.directive("ahoraShowDataOnClick", ["animations", function(animations){
		    return {
		    	restrict : "A",
		        link: function(scope, element, attrs) {
		        	var searchCancel = $("#search__cancel"),
						searchBar = $(".search__input"),
						widget = $(".widget"),
						search = $(".search");
					function showWidget(){
						$(searchBar).addClass(animations.searchBar.exit);
						$(searchCancel).fadeOut(750);
						setTimeout(function(){
							setTimeout(function(){ 
						    	$(searchBar).removeClass(animations.searchBar.exit).hide();
							}, 750);
							$(search).hide();
							$(widget).addClass(animations.widget.enter).show();
						}, 750);
					}
					element.bind("click", showWidget);
		        }
		    };
		}]);
})();