; (function () {
  "use strict"

  angular.module("client.main.pages.register", ["ui.router", "client.services"])

  angular.module("client.main.pages.register").config(RouteConfig)

  RouteConfig.$inject = ["$stateProvider"]

  function RouteConfig($stateProvider) {
    $stateProvider
      .state("main.register", {
        url: "/register",
        views: {
          "body@main": {
            component: "registerDetail"
          }
        }
      })

  }
})()
