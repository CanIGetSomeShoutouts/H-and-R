/* global angular */
; (function () {
    'use strict'

    angular.module('client.main.pages.appointmentEvents')
        .controller('appointmentEventDetailController', AppointmentEventDetailController)

    AppointmentEventDetailController.$inject = ['appointmentEventsService', '$log', '$state', '$stateParams', '$window', 'uiNotificationsService', 'usersService']

    function AppointmentEventDetailController(appointmentEventsService, $log, $state, $stateParams, $window, uiNotificationsService, usersService) {
        var vm = this
        vm.create = _create
        vm.submit = _submit
        vm.$onInit = $init
        vm.username = ''
        vm.dateCreated = ''
        vm.dateModified = ''

        function $init() {
            vm.formData = vm.formData
            vm.appointmentEvents = vm.addresses

            if ($stateParams.id) {
                appointmentEventsService.readById($stateParams.id)
                    .then(data => {
                        vm.formData = data.item
                        vm.formData.participantIdsString = vm.formData.participantIds.join(',')
                        getUsername(vm.formData.userId)
                    })
                    .catch(data => {
                        $log.log(`Error: ${data.errors}`)
                    })
            }
        }

        function getUsername(id) {
            usersService.readById(id)
                .then(data => {
                    vm.username = data.item.username
                })
                .catch(xhr => {
                    console.log(xhr)
                })
        }

        function _submit() {
            if (!vm.form.$invalid) {
                _create()
            }
        }

        function _create() {
            vm.formData.participantIds = vm.formData.participantIdsString.replace(/\s+/g, '').split(',')
            if (!$stateParams.id) {
                appointmentEventsService.create(vm.formData)
                    .then(data => {
                        uiNotificationsService.success("Appointment successfully created.")
                        $state.go('main.appointmentEvents.list')
                    })
                    .catch(data => {
                        uiNotificationsService.error("An error occurred while attempting to create the appointment.")
                        $log.log(`Error: ${data.errors}`)
                    })

            } else {
                appointmentEventsService.update(vm.formData)
                    .then(data => {
                        uiNotificationsService.success("Appointment successfully updated.")
                        $state.go('main.appointmentEvents.list')
                    })
                    .catch(data => {
                        uiNotificationsService.error("An error occured while attempting to update the appointment.")
                        $log.log(`Error: ${data.errors}`)
                    })
            }
        }

        vm.options = {
            format: "MM/DD/YYYY"
        }
    }
})()

    ; (function () {
        angular.module('client.main.pages.appointmentEvents').component('appointmentEventsDetail', {
            templateUrl: 'client/main/pages/appointment.events/detail/appointment.events.detail.html',
            controller: 'appointmentEventDetailController',
            bindings: {
                addresses: '<'
            }
        })
    })()
