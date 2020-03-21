;
(function () {
    'use strict'
    angular.module('client.main.pages.trauma.types').controller('traumaTypesListController', traumaTypesListController)

    traumaTypesListController.$inject = ['traumaTypesService', '$log', '$stateParams', 'uiNotificationsService']

    function traumaTypesListController(traumaTypesService, $log, $stateParams, uiNotificationsService) {
        var vm = this
        vm.delete = _delete
        vm.$onInit = $init
        vm.traumaTypes = [] // This will be set in the trauma.types/module.js at the 'resolve' property 

        function $init() { }

        function _delete(id) {
            uiNotificationsService.confirm('Are you sure you want to delete this trauma type?', 'Yes, delete', 'No, cancel')
                .then(response => {
                    if (!response) { return }
                    traumaTypesService.delete(id)
                        .then(data => {
                            let removeIndex = vm.traumaTypes.findIndex(element => element._id === id)
                            vm.traumaTypes.splice(removeIndex, 1)
                            uiNotificationsService.success('Trauma type successfully deleted.')
                        })
                        .catch(data => {
                            $log.log(`Error: ${data.errors}`)
                            uiNotificationsService.error('An error occurred while attempting to delete the trauma type.')
                        })
                })
        }

    }

})();


; (function () {
    angular.module('client.main.pages.trauma.types').component('traumaTypesList', {
        templateUrl: 'client/main/pages/trauma.types/list/trauma.types.list.html',
        controller: "traumaTypesListController as $ctrl",
        bindings: {
            traumaTypes: '<'
        }
    })

})()

