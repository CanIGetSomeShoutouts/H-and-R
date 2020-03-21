/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure */

;
(function () {
    "use strict"
    angular.module("client.secondary", [
        //base / common - shared
        "client",
        "client.main",

        //view / controller sections
        "client.secondary.pages",
        "client.secondary.shared",
    ])

    angular.module("client.secondary").config(RouteConfig)

    // RouteConfig
    RouteConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"]

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state("secondary", {
                abstract: true,
                views: {
                    "content@": {
                        component: "secondaryLayout"
                    }
                }
            })
            .state("secondary.404", {
                views: {
                    'body@secondary': {
                        template: '<h1>404 Not Found</h1>'
                    }
                }
            })
    }

})();
