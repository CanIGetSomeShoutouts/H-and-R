/* global angular */ ;
(function() {
    "use strict"

    angular.module('client.main.pages.treatmentInvitations')
        .controller('invitesListController', InvitesListController)

    InvitesListController.$inject = ['invitesService', '$log', '$state', 'uiNotificationsService']

    function InvitesListController(invitesService, $log, $state, uiNotificationsService) {
        const vm = this

        vm.click = _click
        vm.delete = _delete

        vm.$onInit = $init

        function $init() {
            vm.invites = vm.treatmentInvitationsList
        }

        function _click(userId) {        
            $state.go('main.treatmentInvitations.detail', { id: userId })
        }

        function _delete(id, index) {
            if (uiNotificationsService.confirm("Would you like to delete this invite?", "Delete", "Cancel")) {
                invitesService.delete(id, vm.invites)
                    .then(response => {
                        $log.log(response)
                        uiNotificationsService.success("Invite has been deleted.")
                        vm.invites.splice(index, 1)
                    })
                    .catch(xhr => {
                        $log.log(xhr)
                    })
            }
        }
    }
})()

;
(function() {
        angular.module('client.main.pages.treatmentInvitations')
            .component('treatmentInvitationsList', {
                templateUrl: 'client/main/pages/treatment.invitations/list/treatment.invitations.list.html',
                controller: 'invitesListController',
                bindings: {
                    treatmentInvitationsList: '<'
                }
            })
})();
