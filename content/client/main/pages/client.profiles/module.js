
; (function () {
    "use strict"

    angular.module("client.main.pages.clientProfiles", ['ui.router'])

    angular.module("client.main.pages.clientProfiles").config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('main.clientProfiles', {
                url: '/admin/client-profiles',
                abstract: true,
                views: {
                    'body@main': {
                        templateUrl:
                            'client/main/pages/client.profiles/main.client.profiles.html',

                    }
                }
            })
            .state('main.clientProfiles.list', {
                url: '/list',
                views: {
                    'clientProfiles@main.clientProfiles': {
                        component: 'clientProfilesListComponent'
                    }
                },
                resolve: {
                    clientProfilesListComponent: getAllProfiles
                }
            })
            .state('main.clientProfiles.create', {
                url: '/details/:id',
                views: {
                    'clientProfiles@main.clientProfiles': {
                        component: 'clientProfilesDetailComponent'
                    }
                },
                resolve: {
                    therapists: readTherapists,
                    supporters: readSupporters,
                    clients: readClients
                }
            })
    }

    getAllProfiles.$inject = ['clientProfileServices', '$log']
    readSupporters.$inject = ['usersService', '$log']
    readTherapists.$inject = ['usersService', '$log']
    readClients.$inject = ['usersService', '$log']


    function getAllProfiles(clientProfileServices, $log) {
        return clientProfileServices.read()
            .then(data => data.items)
            .catch(xhr => {
                $log.log(xhr)
            })
    }
    function readSupporters(usersService, $log) {
        return usersService.readSupporters()
            .then(data => data.items)
            .catch(data => $log.log(`Error: ${data.errors}`))
    }

    function readTherapists(usersService, $log) {
        return usersService.readTherapists()
            .then(data => data.items)
            .catch(data => $log.log(`Error: ${data.errors}`))
    }

    function readClients(usersService, $log) {
        return usersService.readClients()
            .then(data => data.items)
            .catch(xhr => $log.log(`Error: ${data.errors}`))
    }


})()