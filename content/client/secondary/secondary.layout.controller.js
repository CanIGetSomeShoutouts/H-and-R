;
(function () {

    angular.module('client.secondary').controller('secondaryLayoutController', SecondaryLayoutController)

    SecondaryLayoutController.$inject = ['settingsService']

    function SecondaryLayoutController(settingsService) {
        const vm = this

        vm.isToggled = false
        vm.email = ''
        vm.$onInit = $init
        vm.showToggle = _showToggle

        function $init() {
            settingsService.getEnv()
                .then(settings => {
                    vm.email = settings.item
                })
        }

        function _showToggle() {
            vm.showNav = !vm.showNav
        }

        
    }

    angular.module('client.secondary').component('secondaryLayout', {
        templateUrl: 'client/secondary/secondary.layout.html',
        controller: 'secondaryLayoutController as $ctrl'
    })

})();
