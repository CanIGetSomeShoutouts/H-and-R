;(function () {
    "use strict"

    angular.module("client.main.pages")
        .controller("confirmTreatmentInvitationController", ConfirmTreatmentInvitationController)

    ConfirmTreatmentInvitationController.$inject = ["invitesService", "$stateParams", "$state", "$log"]

    function ConfirmTreatmentInvitationController(invitesService, $stateParams, $state, $log) {
        const vm = this
        vm.data = {}
        let data = vm.data
        vm.$onInit = $init

        function $init() {
            let id = $stateParams.invitationId
            data.id = id
            _post()
        }

        function _post() {
            invitesService.confirmTreatmentInvitation(data)
                .then(response => {
                
                    $state.go('main.intakeForm', {treatmentInvitationId: $stateParams.invitationId })
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error("An error occurred while attempting to redirect.")
                })
        }
    }
})();

; (function () {
    angular.module("client.main.pages")
        .component("confirmTreatmentInvitation", {
            controller: "confirmTreatmentInvitationController"
        })
})()