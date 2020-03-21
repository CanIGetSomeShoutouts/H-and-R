
; (function () {
    'use strict'

    angular.module('client.main.pages.treatmentInvitations', ['ui.router', 'client.services'])

    angular.module('client.main.pages.treatmentInvitations').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider 
            .state('main.treatmentInvitations', {
                url: '/admin/treatment-invitations',
                abstract: true,
                views: {
                    'body@main': {
                        templateUrl: 'client/main/pages/treatment.invitations/main.treatment.invitations.html'
                    }
                }
            })

            .state('main.treatmentInvitations.list', {
                url: '/list',
                views: {
                    'treatmentInvitations@main.treatmentInvitations': {
                        component: 'treatmentInvitationsList'
                    }
                },
                resolve: {
                    treatmentInvitationsList: getAllInvites
                }
            })

            .state('main.treatmentInvitations.detail', {
                url: '/detail/:id',
                views: {
                    'treatmentInvitations@main.treatmentInvitations': {
                        component: 'treatmentInvitationsDetail'
                    }
                }
            })
    }

    getAllInvites.$inject = ['invitesService', '$log']

    function getAllInvites(invitesService, $log) {
        return invitesService.read()
            .then(data => data.items)
            .catch(xhr => {
                $log.log(xhr)
            })
    }
})();