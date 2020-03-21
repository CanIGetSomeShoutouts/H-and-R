/* global angular */
; (function () {
    'use strict'

    angular.module('client.main.pages.appointmentEvents')
        .controller('appointmentEventsListController', AppointmentEventsListController)

    AppointmentEventsListController.$inject = ['appointmentEventsService', '$log', '$scope', '$state', '$window', 'uiNotificationsService', 'usersService']

    function AppointmentEventsListController(appointmentEventsService, $log, $scope, $state, $window, uiNotificationsService, usersService) {
        var vm = this
        vm.delete = _delete
        vm.$onInit = $init
        vm.appointmentEventsList = []

        function $init() {
            _getUsernames()

        }

        function _getUsernames() {
            for (let i = 0; i < vm.appointmentEventsList.length; i++) {
                vm.appointmentEventsList[i].usernames = []
                const participants = vm.appointmentEventsList[i].participantIds
                for (let j = 0; j < participants.length; j++) {
                    usersService.readById(participants[j])
                        .then(data => {
                            vm.appointmentEventsList[i].usernames.push(data.item.username)
                        })
                        .catch(xhr => {
                            console.log(xhr)
                        })
                }
            }

        }

        function _delete(id) {
            uiNotificationsService.confirm('Are you sure you want to delete this appointment?', 'Yes, delete', 'No, cancel')
                .then(data => {
                    if (!data) { return }
                    appointmentEventsService.delete(id)
                        .then(data => {
                            let removeIndex = vm.appointmentEventsList.findIndex(element => element._id === id)
                            vm.appointmentEventsList.splice(removeIndex, 1)
                            uiNotificationsService.success("Appointment successfully deleted.")
                        })
                        .catch(data => {
                            uiNotificationsService.error("An error occurred while attempting to delete the appointment.")
                            $log.log(`Error: ${data.errors}`)
                        })
                })
        }
    }

})()
    ; (function () {
        angular.module("client.main.pages.appointmentEvents").component("appointmentEventsList", {
            templateUrl:
                "client/main/pages/appointment.events/list/appointment.events.list.html",
            controller: "appointmentEventsListController",
            bindings: {
                appointmentEventsList: "<"
            }
        })
    })()
