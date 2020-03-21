"use strict"

angular.module("client.main.pages.login", ["ui.router", "client.services"])
angular.module("client.main.pages.login").config(RouteConfig)
RouteConfig.$inject = ["$stateProvider"]

function RouteConfig($stateProvider) {
    $stateProvider
        .state("main.login", {
            url: "/login",
            views: {
                "body@main": {
                    component: "login"
                }
            }
        })
}
