;
(function () {
    'use strict'
    angular.module('client.main.pages.trauma.types').controller('traumaTypesDetailController', traumaTypesDetailController)

    traumaTypesDetailController.$inject = ['traumaTypesService', '$stateParams', '$log', '$state', 'uiNotificationsService']

    function traumaTypesDetailController(traumaTypesService, $stateParams, $log, $state, uiNotificationsService) {
        const vm = this



        vm.formData = null
        vm.create = _create
        vm.update = _update
        vm.submit = "Submit"
        vm.$onInit = $init
        vm.onSubmit = _onSubmit
        const id = $stateParams.id




        function $init() {
            vm.formData = {}

            if (id) {
                traumaTypesService.readById(id)
                    .then(data => {
                        vm.formData = data.item
                        vm.submit = "Submit"
                    })

                    .catch(data => $log.log(`Error: ${data.errors}`))
            }
        }

        function _onSubmit() {

            if (id) {
                _update(id)

            } else {
                _create()

            }
        }

        function _create() {
            traumaTypesService.create(vm.formData)
                .then(data => {
                    $state.go('main.traumaTypes.list')
                    uiNotificationsService.success('Trauma type successfully created.')
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to create the trauma type.')
                })
        }

        function _update(id) {
            traumaTypesService.update(vm.formData, id)
                .then(data => {
                    $state.go('main.traumaTypes.list')
                    uiNotificationsService.success("Trauma type successfully updated.")
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to update the trauma type.')
                })
        }
        
    }

})();
(function () {
    angular.module('client.main.pages.trauma.types').component('traumaTypesDetail', {
        templateUrl: 'client/main/pages/trauma.types/details/trauma.types.detail.html',
        controller: "traumaTypesDetailController as $ctrl",
        bindings: {
            traumaTypes: '<'
        }

    })
})()
