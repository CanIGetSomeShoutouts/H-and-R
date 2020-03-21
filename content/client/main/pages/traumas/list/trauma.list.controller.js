;
(function () {
    'use strict'

    angular.module('client.main.pages.traumas')
        .controller('traumaListController', TraumaListController)

    TraumaListController.$inject = ['traumaPostService', '$log', 'uiNotificationsService']

    function TraumaListController(traumaPostService, $log, uiNotificationsService) {
        const vm = this
        vm.delete = _delete

        vm.$onInit = $init

        function $init() {
            vm.traumaList = vm.traumaList
        }

        function _delete(id, index) {
            uiNotificationsService.confirm('Are you sure want to delete this trauma?', 'Yes, delete', 'No, cancel')
                .then(response => {
                    if (!response) { return }
                    traumaPostService.delete(id)
                        .then(data => {
                            vm.traumaList.splice(index, 1)
                            uiNotificationsService.success('Trauma successfully deleted.')
                        })
                        .catch(data => {
                            $log.log(`Error: ${data}`)
                            uiNotificationsService.error('An error occurred while attempting to delete the trauma.')
                        })
                })
        }

    }
})();

// Trauma List Component
(function () {
    angular.module("client.main.pages.traumas").component("traumaList", {
        templateUrl: "client/main/pages/traumas/list/trauma.list.html",
        controller: "traumaListController",
        bindings: {
            traumaList: '<'
        }
    })
})();


