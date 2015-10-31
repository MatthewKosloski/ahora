(function(){
	angular.module("directives")
		.directive("ahoraStats", ["animations", function(animations){
		    return {
		    	restrict : "A",
		        link: function (element) {
		        	var mainContent = $(".main__content"),
						mainStats = $(".main__stats"),
						duration = 250;
					element.bind({
						mouseenter: function(){
							$(mainContent).fadeOut(duration);
							$(mainStats).fadeIn(duration);
						},
						mouseleave: function(){
							$(mainStats).fadeOut(duration);
							$(mainContent).fadeIn(duration);
						}
					});
		        }
		    };
		}]);
})();