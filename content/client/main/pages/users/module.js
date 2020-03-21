; (function () {
  "use strict"

  angular.module("client.main.pages.users", [
    "ui.router",
    "client.services",
    "ngMask",
    "client.directives"
  ])

    angular.module("client.main.pages.users").config(RouteConfig)

    RouteConfig.$inject = ["$stateProvider"]

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("main.users", {
                url: "/admin/users",
                abstract: true,
                views: {
                    "body@main": {
                        templateUrl: "client/main/pages/users/main.users.html"
                    }
                }
            })
            .state("main.users.list", {
                url: "/list",
                views: {
                    "users@main.users": {
                        component: "usersList"
                    }
                },
                resolve: {
                    usersList: getAllUsers
                }
            })
            .state("main.users.detail", {
                url: "/detail/:id",
                views: {
                    "users@main.users": {
                        component: "usersDetail"
                    }
                },
                resolve: {
                    usersDetail: getAllById,
                    userSupporters: populateSupporters,
                    userTherapists: populateTherapists,
                    userClients: populateClients
                },
                params: {
                    id: null
                }
            })
    }

    getAllUsers.$inject = ['usersService', '$log']
    getAllById.$inject = ['usersService', '$log', '$stateParams']
    populateSupporters.$inject = ['usersService', '$log']
    populateTherapists.$inject = ['usersService', '$log']
    populateClients.$inject = ['usersService', '$log']

    function getAllUsers(usersService, $log) {
        return usersService
            .read()
            .then(data => data.items)
            .catch(xhr => {
                $log.log(xhr)
            })
    }

    function populateClients(usersService, $log) {
        return usersService.readClients()
            .then(data => data.items)
            .catch(xhr => {
                $log.log(xhr)
            })
    }


    function populateSupporters(usersService, $log) {
        return usersService.readSupporters()
            .then(data => data.items)
            .catch(xhr => {
                $log.log(xhr)
            })
    }

    function populateTherapists(usersService, $log) {
        return usersService.readTherapists()
            .then(data => data.items)
            .catch(xhr => {
                $log.log(xhr)
            })
    }

    function getAllById(usersService, $log, $stateParams) {
        if (!$stateParams.id) { return }
            return usersService
                .readById($stateParams.id)
                .then(data => {
                    return data.item
                })
                .catch(xhr => {
                    $log.log(xhr)
                })
    }

})()
