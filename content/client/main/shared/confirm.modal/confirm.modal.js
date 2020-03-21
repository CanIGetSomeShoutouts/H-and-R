;
(function() {
    "use strict"

    angular.module('client.main.shared').controller('confirmModalController', ConfirmModalController)

    ConfirmModalController.$inject = []

    function ConfirmModalController() {
        const vm = this

        vm.confirm = _confirm
        vm.cancel = _cancel

        vm.$onInit = $init

        function $init() {
            vm.items = vm.resolve.messages
        }

        function _confirm() {
            return vm.close({ $value: true })
        }

        function _cancel() {
            return vm.close({ $value: false })
        }
    }
})();;
(function() {
    angular.module('client.main.shared')
        .component('confirmModal', {
            templateUrl: 'client/main/shared/confirm.modal/confirm.modal.html',
            controller: 'confirmModalController',
            bindings: {
                resolve: '<',
                close: '&'
            }
        })


})();
