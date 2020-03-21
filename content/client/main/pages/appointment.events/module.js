/* global angular */
(function () {
    'use strict'

    angular.module('client.main.pages.appointmentEvents', ['ui.router', 'client.services'])

    angular.module('client.main.pages.appointmentEvents').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('main.appointmentEvents', {
                url: '/admin/appointment-events',
                abstract: true,
                views: {
                    'body@main': {
                        templateUrl:
                            "client/main/pages/appointment.events/appointment.events.layout.html"
                    }
                }
            })
            .state('main.appointmentEvents.detail', {
                url: '/details/:id',
                views: {
                    'appointmentEvents@main.appointmentEvents': {
                        component: 'appointmentEventsDetail'
                    }
                },
                resolve: {
                    addresses: getAllAddresses
                }
            })
            .state('main.appointmentEvents.list', {
                url: '/list/',
                views: {
                    'appointmentEvents@main.appointmentEvents': {
                        component: 'appointmentEventsList'
                    }
                },
                resolve: {
                    appointmentEventsList: getAllAppointmentEvents
                }

            })
    }

    getAllAppointmentEvents.$inject = ['appointmentEventsService']

    function getAllAppointmentEvents(appointmentEventsService) {
        return appointmentEventsService.read()
            .then(data => data.items)
    }

    getAllAddresses.$inject = ['addressesService']

    function getAllAddresses(addressesService) {
        return addressesService.read()
            .then(data => data.items)
    }

})()
