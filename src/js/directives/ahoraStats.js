(function(){
	angular.module("directives")
		.directive("ahoraStats", function(){
		    return {
		    	restrict : "A",
		        link: function (scope, element, attrs) {
		        	var mainContent = $(".main__content"),
						mainStats = $(".main__stats"),
						duration = 250;

					var browserWidth = $(window).width();

					if(browserWidth >= 640) {
						element.bind({
							mouseenter: function(){
								mainContent.fadeOut(duration);
								mainStats.fadeIn(duration);
							},
							mouseleave: function(){
								mainStats.fadeOut(duration);
								mainContent.fadeIn(duration);
							}
						});
					}
		        }
		    };
		});
})();