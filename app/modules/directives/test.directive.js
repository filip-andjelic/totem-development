angular.module("testApp").directive("testDirective", [ function() {
	return {
		scope: false,
		restict: "AE",
		template: "<div></div>",
		link: function( scope, element, arguments ) {
			scope.demo = "TEST DEMO!";
		}
	}
}]);