/* global angular */
; (function () {
    'use strict'

    angular.module('client.main.pages.intakeForms')
        .controller('intakeFormDetailController', intakeFormDetailController)

    intakeFormDetailController.$inject = ['intakeFormsService', '$state', '$stateParams', '$log', 'uiNotificationsService']

    function intakeFormDetailController(intakeFormsService, $state, $stateParams, $log, uiNotificationsService) {
        const vm = this
        vm.create = _create
        vm.submitValidation = submitValidation
        vm.$onInit = $init

        function $init() {
            vm.intakeFormsD = vm.intakeForms
            typeIdsString()
        }

        function typeIdsString() {
            if (vm.intakeForms) {
                vm.intakeFormsD.traumaTypeIdsString = vm.intakeFormsD.traumaTypeIds.join(",")
            }
        }

        function submitValidation() {
            if (!vm.intakeFormForm.$invalid) {
                _create()
            }
        }

        function _create() {
            if (!$stateParams.id) {
                intakeFormsService.create(vm.intakeFormsD)
                    .then(data => {
                        uiNotificationsService.success('Intake Form successfully created.')
                        $state.go('main.intakeForms.list')
                    })
                    .catch(data => {
                        $log.log(`Error: ${data.errors}`)
                        uiNotificationsService.error('An error occurred while attempting to create the intake form.')
                    })
            } else {
                intakeFormsService.update(vm.intakeFormsD)
                    .then(data => {
                        uiNotificationsService.success('Intake Form successfully updated.')
                        $state.go('main.intakeForms.list')
                    })
                    .catch(data => {
                        $log.log(`Error: ${data.errors}`)
                        uiNotificationsService.error('An error occurred while attempting to update the intake form.')
                    })
            }
        }
    }
})();

; (function () {
    'use strict'
    angular.module('client.main.pages.intakeForms')
        .component('intakeFormDetail', {
            templateUrl: "client/main/pages/intake.forms/detail/intake.forms.detail.html",
            controller: 'intakeFormDetailController',
            bindings: {
                intakeForms: '<', 
                traumaTypes: '<'
            }
        })
})();
