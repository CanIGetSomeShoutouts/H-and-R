;
(function() {
    'use strict'

    angular.module('client.main.pages.journalTags')
        .controller('tagDetailController', TagDetailController)

    TagDetailController.$inject = ['tagsService', '$log', '$stateParams', '$state', 'uiNotificationsService', 'usersService']

    function TagDetailController(tagsService, $log, $stateParams, $state, uiNotificationsService, usersService) {
        const vm = this
        vm.$onInit = $init
        vm.create = _create
        vm.update = _update
        vm.formData = {}
        vm.maxMinEvenlyDivisible = _maxMinEvenlyDivisible
        vm.alertEvenlyDivisible = _alertEvenlyDivisible
        vm.minLessThanMax = _minLessThanMax
        vm.alertInRange = _alertInRange
        vm.createTagName = _createTagName
        vm.formData.name = ""
        vm.clearAlert = _clearAlert
        vm.validationMessage = _validationMessage
        vm.validationSetup = _validationSetup

        function $init() {
            vm.icons = vm.readIcons
            vm.clients = vm.readClients
            vm.formData.severityMin = 1
            vm.formData.severityMax = 3
            vm.formData.severityStep = 1
            if ($stateParams.id) {
                _readById($stateParams.id)
            }

        }

        function _clearAlert() {
            if (vm.formData.clientId != null) {
                vm.formData.alertThreshold = null
                vm.tagForm.alertThreshold.$setValidity('range', true);
            }
            if (vm.tagForm.alertThreshold.$empty) {
                vm.tagForm.alertThreshold.$setValidity('range', true)
            }

        }

        function _maxMinEvenlyDivisible(step) {
            return (vm.formData.severityMax - vm.formData.severityMin) % step == 0
        }

        function _alertEvenlyDivisible(alert) {
            return alert % vm.formData.severityStep == 0
        }

        function _minLessThanMax(min) {
            return min < vm.formData.severityMax
        }

        function _alertInRange(alert) {
            return (alert >= vm.formData.severityMin && alert <= vm.formData.severityMax) || vm.formData.clientId
        }

        function _createTagName() {
            return vm.formData.name.toLowerCase().replace(/ /g, "-")
        }

        function _readById(id) {
            tagsService.readById(id)
                .then(data => {
                    vm.formData = data.item
                })
                .catch(error => {
                    $log.log(error)
                })
        }

        function _validationMessage(property, rule) {
            return (vm.tagForm[property].$touched && vm.tagForm[property].$error[rule])
        }

        function _validationSetup(property) {
            return (vm.tagForm[property].$invalid && vm.tagForm[property].$touched)
        }

        function _create() {
            if (vm.tagForm.$invalid) {

                angular.forEach(vm.tagForm.$error, function(field) {
                    angular.forEach(field, function(errorField) {
                        errorField.$setTouched()
                    })
                })
                return
            }
            vm.formData.tagName = _createTagName()
            tagsService.create(vm.formData)
                .then(data => {
                    uiNotificationsService.success("Journal tag successfully created.")
                    $state.go("main.journalTags.list")
                })
                .catch(data => {
                    if (data.errors.unique == false) {
                        uiNotificationsService.error("Your tag name must be unique.")
                    }
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to create the journal tag.')
                })
        }

        function _update() {
            vm.formData.tagName = _createTagName()
            tagsService.update(vm.formData)
                .then(data => {
                    uiNotificationsService.success("Journal Tag successfully updated.")
                    $state.go("main.journalTags.list")
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to update the journal tag.')
                })
        }


    }

    angular.module("client.main.pages.journalTags").component("detailComponent", {
        templateUrl: 'client/main/pages/journal.tags/detail/journal.tags.detail.html',
        controller: 'tagDetailController as $ctrl',
        bindings: {
            readIcons: '<',
            readClients: '<'

        }
    })
})()
