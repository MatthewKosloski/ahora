(function(){
	angular.module("directives")
		.directive("ahoraShowDataOnSubmit", ["animations", function(animations){
		    return {
		    	restrict : "A",
		        link: function ($scope, element, attrs) {
		        	var searchCancel = $("#search__cancel"),
						searchBar = $(".search__input"),
						data = $(".data"),
						search = $(".search"),
						summary = $(".summary");
					function showData(){
						$(searchBar).addClass(animations.searchBar.exit);
						$(searchCancel).fadeOut(750);
						setTimeout(function(){
							$(summary).css({"visibility":"visible"}).addClass(animations.summary.enter).show();
							setTimeout(function(){ 
						    	$(searchBar).removeClass(animations.searchBar.exit).hide();
							}, 750);
							$(search).hide();
							$(data).addClass(animations.data.enter).show();
						}, 750);
					}
					element.bind("submit", showData);
		        }
		    };
		}]);
})();