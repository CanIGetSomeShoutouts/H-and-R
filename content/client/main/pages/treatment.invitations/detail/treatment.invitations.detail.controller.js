; (function () {
    'use strict'

    angular.module('client.main.pages.treatmentInvitations')
        .controller('invitesDetailController', InvitesDetailController)

    InvitesDetailController.$inject = ['invitesService', '$stateParams', '$log', '$state', 'uiNotificationsService']

    function InvitesDetailController(invitesService, $stateParams, $log, $state, uiNotificationsService) {
        const vm = this

        vm.usernameNotFound = null
        vm.invite = null
        vm.click = _click
        vm.create = _create
        vm.update = _update
        vm.formValidate = _formValidate
        vm.usernameChange = _usernameChange
        vm.$onInit = $init

        function $init() {
            vm.invite = {}
            vm.usernameNotFound = false
            if ($stateParams.id) {
                invitesService.readById($stateParams.id)
                    .then(data => vm.invite = data.item)
                    .catch(data => $log.log(`Error: ${data.errors}`))
            }
        }
   
        function _click() {
            if (!vm.invite._id) {
                _create()
            } else {
                _update()
            }
        }

        function _usernameChange(){
            vm.usernameNotFound = false
        }

        function _formValidate() {
            if (vm.form.$valid) {
                for(let prop in vm.invite){
                    if(vm.invite[prop] === ""){
                        delete vm.invite[prop]
                    }
                }
                _click()
            } else {
                $log.log('You must have valid input.')
                uiNotificationsService.error('You must have valid inputs.')
            }
        }

        function _create() {
            invitesService.create(vm.invite)
                .then(response => {
                    $log.log(response)
                    uiNotificationsService.success('Congrats, your invite has been sent.')
                    $state.go('main.treatmentInvitations.list')
                })
                .catch(xhr => {
                    $log.log(xhr)
                    if (xhr.errors) {
                        uiNotificationsService.error("No user with that username")
                        vm.usernameNotFound = true
                    }
                })
        }

        function _update() {
            invitesService.update(vm.invite)
                .then(response => {
                    uiNotificationsService.success('Your invite has been updated. Keep up the good work!')
                    $state.go('main.treatmentInvitations.list')
                })
                .catch(xhr => {
                    $log.log(xhr)
                    if (Array.isArray(xhr.errors)){
                        xhr.errors.forEach(error => {
                            uiNotificationsService.error(error.message)
                            if(error.message.includes(vm.invite.username)){
                                vm.usernameNotFound = true
                            }
                        })
                    } else {
                        uiNotificationsService.error('Unable to update treatment invitation: ' + xhr.errors)
                        if(xhr.errors.includes(vm.invite.username)){
                            vm.usernameNotFound = true
                        }
                    }
                })
        }
    }

})()

    ; (function () {
        angular.module('client.main.pages.treatmentInvitations')
            .component('treatmentInvitationsDetail', {
                templateUrl: 'client/main/pages/treatment.invitations/detail/treatment.invitations.detail.html',
                controller: 'invitesDetailController',
                bindings: {
                }
            })
    })()

