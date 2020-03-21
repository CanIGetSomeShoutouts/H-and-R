;
(function() {
    "use strict"

    angular.module("client.main.pages.journalEvents", [
        "ui.router",
        "client.services"
    ])

    angular.module("client.main.pages.journalEvents").config(RouteConfig)

    RouteConfig.$inject = ["$stateProvider"]

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("main.journalsEvents", {
                url: "/admin/journal-events",
                abstract: false,
                views: {
                    "body@main": {
                        templateUrl: "client/main/pages/journal.events/main.pages.journals.events.html"
                    }
                }
            })
            .state("main.journalsEvents.list", {
                url: "/list",
                views: {
                    "journalEvents@main.journalsEvents": {
                        component: "journalList"
                    }
                },
                resolve: {
                    journalList: getAllJournals
                }
            })
            .state("main.journalsEvents.details", {
                url: "/details/:id",
                views: {
                    "journalEvents@main.journalsEvents": {
                        component: "journalDetail"
                    }
                },
                resolve: {
                    traumaTypes: getTraumaTypes,
                    users: getUsers
                }
            })
    }
    getAllJournals.$inject = ["journalsEventsService"]
    getTraumaTypes.$inject = ["traumaTypesService"]
    getUsers.$inject = ["usersService"]

    function getAllJournals(journalsEventsService) {
        return journalsEventsService.read()
            .then(data => data.item)
    }

    function getTraumaTypes(traumaTypesService) {
        return traumaTypesService.readPublished()
            .then(data => data.items)
    }

    function getUsers(usersService) {
        return usersService.read()
            .then(data => {
                // Filter out users that are admin
                let users = data.items.filter(user => user.userType !== "Admin")
                return users
            })
    }
})()
