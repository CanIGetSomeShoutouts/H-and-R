; (function () {
    'use strict'

    angular.module('client.main.pages.traumas')
        .controller('traumaPostController', TraumaPostController)

    TraumaPostController.$inject = ['traumaPostService', '$log', '$stateParams', '$state', 'uiNotificationsService']

    function TraumaPostController(traumaPostService, $log, $stateParams, $state, uiNotificationsService) {
        const vm = this

        vm.postOrPut = _postOrPut

        vm.$onInit = $init

        function $init() {
            vm.formData = {}

            vm.optionsUpdate = optionsUpdate
            vm.viewerIds = vm.getViewerIds

            if ($stateParams.id) {
                traumaPostService.readById($stateParams.id)
                    .then(data => {
                        vm.formData = data.item
                    })
                    .catch(data => $log.log(`Error: ${data.errors}`))
            }

            vm.beginOptions = {
                format: "MM/DD/YYYY h:mm A"
            }
            vm.endOptions = {
                format: "MM/DD/YYYY h:mm A"
            }
        }

        function optionsUpdate(beginDate, endDate) {
            vm.beginOptions.maxDate = vm.formData.endDate
            vm.endOptions.minDate = vm.formData.beginDate
        }

        function _postOrPut() {
            if ($stateParams.id) {
                _update()
            }
            else {
                _create()
            }
        }

        function _create() {
            traumaPostService.create(vm.formData)
                .then(data => {
                    uiNotificationsService.success('Trauma successfully created.')
                    $state.go('main.traumas.list')
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error("An error occurred while attempting to create the trauma.")
                })
        }

        function _update() {
            traumaPostService.update(vm.formData)
                .then(data => {
                    uiNotificationsService.success('Trauma successfully updated.')
                    $state.go('main.traumas.list')
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error("An error occurred while attempting to update the trauma.")
                })
        }
    }

    angular.module('client.main.pages.traumas').component('traumaDetail', {
        templateUrl: '/client/main/pages/traumas/detail/trauma.detail.html',
        controller: 'traumaPostController',
        bindings: {
            getViewerIds: '<'
        }
    })
})()