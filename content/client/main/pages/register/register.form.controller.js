;
(function() {
    "use strict"

    angular.module("client.main.pages.register")
        .controller("registerDetailController", RegisterDetailController)

    RegisterDetailController.$inject = ["usersService", "$log", "uiNotificationsService"]

    function RegisterDetailController(usersService, $log, uiNotificationsService) {
        const vm = this
        vm.create = _create
        vm.$onInit = $init
        vm.registerData = {}
        vm.formValidate = _formValidate
        vm.validBoth = _validBoth
        vm.valid = _valid
        vm.matchPassword = _matchPassword

        function $init() {}

        // Validation

        function _formValidate() {
            if (!vm.registerForm.$invalid) {
                _create()
            } else {
                return
            }
        }

        function _validBoth(x) {
            return vm.registerForm.$submitted && vm.registerForm[x].$invalid
        }

        function _valid(x) {
            return (
                (vm.registerForm.$submitted && vm.registerForm[x].$error.required) ||
                (vm.registerForm.$submitted && vm.registerForm[x].$error.pattern) ||
                (vm.registerForm.$submitted && vm.registerForm[x].$error.match)
            )
        }

        function _create() {
            usersService.create(vm.registerData)
                .then(data => uiNotificationsService.success("Thank you for registering. Please check your email to complete the process."))
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to register.')
                })
        }

        function _matchPassword(x) {
            return x == vm.registerData.password
        }
    }
})();
(function() {
    angular.module("client.main.pages.register").component("registerDetail", {
        templateUrl: "client/main/pages/register/register.form.html",
        controller: "registerDetailController",
        bindings: {
            registerDetail: "<"
        }
    })
})()
