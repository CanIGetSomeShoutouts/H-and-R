;
(function() {
    "use strict"

    angular.module('client.main.pages.addresses')
        .controller("addressesDetailController", AddressesDetailController)

    AddressesDetailController.$inject = ["addressesService", "$stateParams", "$log", "$state", "uiNotificationsService", '$window']

    function AddressesDetailController(addressesService, $stateParams, $log, $state, uiNotificationsService, $window) {
        const vm = this

        vm.$onInit = $init
        vm.formData = null
        vm.states = []
        vm.update = _update
        vm.create = _create
        vm.getLocation = _getLocation
        vm.formattedAddress = null       

        function $init() {

            vm.formData = {}
            _readById()

        }

        function _readById() {
            if ($stateParams.id) {
                addressesService.readById($stateParams.id)
                    .then(data => {vm.formData = data.item
                    vm.formattedAddress = vm.formData.lineOne + ' ' + vm.formData.lineTwo + ',' + ' ' + vm.formData.city + ',' + ' ' + vm.formData.stateCode + '.' + ' ' + vm.formData.postalCode
                        return true
                })
                    .catch(data => $log.log(`Error: ${data.errors}`))
            }
        }

        function _update() {
            let address_components = vm.address.address_components
            let components = {}
            jQuery.each(address_components, function (k, v1) {
              jQuery.each(v1.types, function(k2, v2) {
                components[v2] = v1.short_name;
              })
            })
                    
            vm.formData = {
                lineOne: components.street_number,
                lineTwo: components.route,
                city: components.locality,
                stateCode: components.administrative_area_level_1,
                postalCode: components.postal_code,
                lat: vm.address.geometry.location.lat(),
                lon: vm.address.geometry.location.lng()
            }

            vm.formData._id = $stateParams.id
            addressesService.update(vm.formData)
                .then(data => {
                    vm.formData = null
                    uiNotificationsService.success("Address updated successfully.")
                    $state.go("^.list")
                })
                .catch(data => {
                    $log.warn(`Error: ${data.errors}`)
                    uiNotificationsService.error("An error occurred while attempting to update the address.")
                })
            }

        function _create() {          
            let address_components = vm.address.address_components
            let components = {}
            jQuery.each(address_components, function (k, v1) {
              jQuery.each(v1.types, function(k2, v2) {
                components[v2] = v1.short_name
              })
            })
                    
            vm.formData = {
                lineOne: components.street_number,
                lineTwo: components.route,
                city: components.locality,
                stateCode: components.administrative_area_level_1,
                postalCode: components.postal_code,
                lat: vm.address.geometry.location.lat(),
                lon: vm.address.geometry.location.lng()
            }

            addressesService.create(vm.formData)
                .then(data => {
                    vm.formData._id = data.item
                    $log.log(data)
                    uiNotificationsService.success("Address created successfully.")
                    $state.go("^.list")
                    vm.formData = null
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error("An error occurred while attempting to create the address.")
                })
            }

        function _getLocation() {
            $window.alert(vm.selectedLocation)
        }       
    }
 
    angular.module('client.main.pages.addresses')
        .component("addressesDetail", {
            templateUrl: "client/main/pages/addresses/detail/addresses.detail.html",
            controller: "addressesDetailController",
            bindings: {
                states: "<" 
            }
        })
})()
