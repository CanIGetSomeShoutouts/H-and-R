/* global angular */ ;
(function() {
    "use strict"
    angular.module("client.main.pages.login")
        .controller("loginController", LoginController)

    LoginController.$inject = ["usersService", "$log", "$state", "uiNotificationsService"]

    function LoginController(usersService, $log, $state, uiNotificationsService) {
        const vm = this
        vm.formData = null
        vm.loginFailFlag = null
        vm.$onInit = $init
        vm.login = _login

        function $init() {
            vm.loginFailFlag = false
            vm.formData = {}
        }

        function _login() {
            if (vm.loginForm.$invalid) { return }
            usersService.login(vm.formData)
                .then(user => {
                    uiNotificationsService.success('Login successful.')
                    $state.go("main.users.list", {}, { reload: true })
                })
                .catch(error => {
                    vm.loginFailFlag = true
                    $log.log(error)
                    uiNotificationsService.error('An error occurred while attempting to login.')
                })
        }
    }

    angular.module("client.main.pages.login")
        .component("login", {
            templateUrl: "client/main/pages/login/login.html",
            controller: "loginController"
        })
})();
