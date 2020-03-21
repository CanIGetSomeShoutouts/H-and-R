/* global angular */

;
(function() {
    "use strict"
    angular.module("client.secondary.pages.homePage", ["ui.router", "client.services"])

    angular.module("client.secondary.pages.homePage").config(RouteConfig)

    RouteConfig.$inject = ["$stateProvider"]

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("secondary.homePage", {
                url: "/",
                views: {
                    "body@secondary": {                    
                        template: '<react-loader props="$resolve" react-component="Homepage" />'
                    }
                },
                resolve: {}
            })
    }
})();
