;
(function () {
    "use strict"

    angular.module("client.main.pages")
        .controller("userConfirmController", UserConfirmController)

    UserConfirmController.$inject = ["usersService", "$stateParams", "uiNotificationsService", "$state"]

    function UserConfirmController(usersService, $stateParams, uiNotificationsService, $state) {
        const vm = this
        const emailConfirm = {}
        vm.$onInit = $init

        function $init() {
            emailConfirm._id = $stateParams.id

            usersService.confirmEmail(emailConfirm)
                .then(data => {
                    uiNotificationsService.success("Email address successfully confirmed. You may now login.")
                    $state.go("secondary.loginPage")
                })
                .catch(data => uiNotificationsService.error("An error occurred while attempting to confirm your email."))
        }
    }

    angular.module("client.main.pages").component("userConfirmEmail", {
        controller: "userConfirmController",
        bindings: {
            confirmEmail: "<"
        }
    })
})();
