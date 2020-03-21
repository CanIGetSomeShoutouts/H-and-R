/* global angular */

; (function () {
    'use strict'
    angular.module('client.main.pages.intakeForms')
        .controller('intakeFormListController', intakeFormListController)
    intakeFormListController.$inject = ['intakeFormsService', '$log', 'uiNotificationsService']
    function intakeFormListController(intakeFormsService, $log, uiNotificationsService) {
        const vm = this
        vm.delete = _delete
        vm.$onInit = $init

        function $init() {
            vm.intakeForms = vm.intakeForms
        }

        function _delete(id) {
            uiNotificationsService.confirm('Are you sure you want to delete this intake form?', 'Yes, delete', 'No, cancel')
                .then(response => {
                    if (!response) { return }
                    intakeFormsService.delete(id)
                        .then(data => {
                            let removeIndex = vm.intakeForms.findIndex(element => element._id === id)
                            vm.intakeForms.splice(removeIndex, 1)
                            uiNotificationsService.success('Intake form successfully deleted.')
                        })
                        .catch(data => {
                            $log.log(`Error: ${data.errors}`)
                            uiNotificationsService.error('An error occurred while attempting to delete the intake form.')
                        })

                })
        }
    }
})();

; (function () {
    'use strict'
    angular.module('client.main.pages.intakeForms')
        .component('intakeFormList', {
            templateUrl: 'client/main/pages/intake.forms/list/intake.forms.list.html',
            controller: 'intakeFormListController',
            bindings: {
                intakeForms: '<'
            }
        })
})();


