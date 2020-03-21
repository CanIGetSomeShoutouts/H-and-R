; (function () {
    "use strict"

    angular.module("client.secondary.pages")
        .controller("supporterConfirmInvitationController", SupporterConfirmInvitationController)

    SupporterConfirmInvitationController.$inject = ['$stateParams', '$state', 'supportInvitationsService', '$cookies']

    function SupporterConfirmInvitationController($stateParams, $state, supportInvitationsService, $cookies) {
        const vm = this
        vm.$onInit = $init
        const cookieCheck = $cookies.get('auth')

        function $init() {
            if (cookieCheck) {
                let currentUser = (JSON.parse($cookies.get('auth').slice(2)))
                supportInvitationsService.confirm($stateParams.invitationId, { supportId: currentUser.userId })
                    .then(data => {
                        switch(currentUser.userType){
                            case 'Supporter': $state.go('main.supporter'); break
                            case 'Client' : $state.go('main.supportees'); break
                            case 'Therapist' : $state.go('main.myClients'); break
                        }
                    })
                    .catch(data => {
                        console.log(data)
                    })
            } else {
                $state.go('secondary.supporterSignUp', vm.getUrlParams)
            }
        }
    }

    angular.module('client.secondary.pages').component('supporterConfirmInvitation', {
        controller: 'supporterConfirmInvitationController',
        bindings: {
            getUrlParams: '<'
        }
    })
})();