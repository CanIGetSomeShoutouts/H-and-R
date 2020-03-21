/* global angular */ ;
(function() {
    'use strict'

    // add crud moduled as dependencies to the array below.
    angular.module('client.main.pages.journalTags', ['ui.router', 'ui.validate', 'client.react'])

    angular.module('client.main.pages.journalTags').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('main.journalTags', {
                url: '/admin/journal-tags',
                abstract: false,
                views: {
                    'body@main': {
                        templateUrl: 'client/main/pages/journal.tags/main.journal.tags.html'
                    }
                }
            })
            .state('main.journalTags.list', {
                url: '/list',
                views: {
                    'journalTags@main.journalTags': {
                        component: 'listComponent'
                    }
                },
            })
            .state('main.journalTags.details', {
                url: '/details/:id',
                views: {
                    'journalTags@main.journalTags': {
                        component: 'detailComponent'
                    }
                },
                resolve: {
                    readIcons: readIcons,
                    readClients: readClients
                }
            })

    }

    readIcons.$inject = ["tagsService", "$log"]
    readClients.$inject = ["usersService", "$log"]

    function readIcons(tagsService, $log) {
        return tagsService.readIcons()
            .then(data => data.items)
    }

    function readClients(usersService, $log) {
        return usersService.readClients()
            .then(data => data.items)
    }

})();
