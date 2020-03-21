/* global angular */;
(function () {
    'use strict'

    // add crud moduled as dependencies to the array below.
    angular.module('client.main.pages.traumas', ['ui.router', 'client.services'])

    angular.module('client.main.pages.traumas').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('main.traumas', {
                url: '/admin/traumas',
                abstract: true,
                views: {
                    'body@main': {
                        templateUrl: 'client/main/pages/traumas/main.trauma.html'
                    }
                }
            })
            .state('main.traumas.detail', {
                url: '/detail/:id',
                views: {
                    'histories@main.traumas': {
                        component: 'traumaDetail'
                    }
                },
                resolve: {
                    getViewerIds: getViewerIds
                }
            })
            .state('main.traumas.list', {
                url: '/list',
                views: {
                    "histories@main.traumas": {
                        component: 'traumaList'
                    }
                },
                resolve: {
                    traumaList: getAllHistories
                }

            })
    }

    getAllHistories.$inject = ['traumaPostService']
    getViewerIds.$inject = ['usersService', '$q']

    function getAllHistories(traumaPostService) {
        return traumaPostService.read()
            .then(data => data.items)
            .catch(data => data.error)
    }

    function getViewerIds(usersService, $q) {
        let viewers = []
        return $q.all([
            usersService.readClients(),
            usersService.readTherapists(),
            usersService.readSupporters()
        ])
            .then(data => {
                for (let k = 0; k < data.length; k++) {
                    for (let i = 0; i < data[k].items.length; i++) {
                        viewers.push(data[k].items[i])
                    }
                }
                return viewers
            })
            .catch(data => data.error)
    }
    // register client-side routes here, nested in "main" state.
})();
