
/* global angular */
; (function () {
    'use strict'

    angular.module('client.main.pages.addresses')
        .controller('addressesListController', AddressesListController, )

    AddressesListController.$inject = ['addressesService', "$stateParams", '$log', "uiNotificationsService"] 

    function AddressesListController(addressesService, $stateParams, $log, uiNotificationsService) {
        const vm = this

        vm.$onInit = $init
        vm.delete = _delete

        function $init() { }

        function _delete(id) {
            uiNotificationsService.confirm("Are you sure you want to delete this address?", 'Yes, delete', 'No, cancel')
                .then(response => {
                    if (!response) { return }
                    addressesService.delete(id)
                        .then(data => {
                            let removeIndex = vm.addresses.findIndex(element => element._id === id)
                            vm.addresses.splice(removeIndex, 1)
                            uiNotificationsService.success("Address successfully deleted.")
                        })
                        .catch(data => {
                            $log.log(`Error: ${data.errors}`)
                            uiNotificationsService.error("An error occurred while attempting to delete the address.")
                        })
                    })
                }
            }
   
    //////////component//////////////////////////////////
    angular.module('client.main.pages.addresses')
        .component("addressesList", {
            templateUrl: "client/main/pages/addresses/list/addresses.list.html",
            controller: "addressesListController",
            bindings: {
                addresses: "<"
            }
        })
})()
