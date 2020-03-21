/* global angular */
; (function () {
    'use strict'

    angular.module('client.main.pages.supportPosts')
        .controller('supportPostsDetailController', SupportPostsDetailController)

    SupportPostsDetailController.$inject = ['supportPostsService', 'usersService', '$stateParams', '$state', '$log', 'summernoteToolbar', 'uiNotificationsService']

    function SupportPostsDetailController(supportPostsService, usersService, $stateParams, $state, $log, summernoteToolbar, uiNotificationsService) {
        const vm = this

        vm.supportPosts = []
        vm.update = _update
        vm.create = _create
        vm.$onInit = $init
        vm.summernote = summernoteToolbar
        vm.clients = {}
        vm.supportPost = []


        function $init() {
            if (vm.supportPost) {
                vm.post = vm.supportPost
                vm.formData = vm.post
                vm.updateBtn = true
                vm.createBtn = false
            } else {
                vm.updateBtn = false
                vm.createBtn = true
            }


            vm.supporters = vm.supporters
            vm.therapists = vm.therapists
            vm.clients = vm.clients
            vm.viewerIds = vm.supporters.concat(vm.clients, vm.therapists)

        }


        function _create() {
            supportPostsService.create(vm.formData)
                .then(data => {
                    uiNotificationsService.success('Support Post successfully created.')
                    $state.go('main.supportPosts.list')
                })
                .catch(err => {
                    $log.log(`Error: ${err}`)
                    uiNotificationsService.error('An error occurred while attempting to create the support post.')
                })
        }

        function _update() {
            supportPostsService.update(vm.formData)
                .then(data => {
                    uiNotificationsService.success('Support post successfully updated.')
                    vm.formData = null
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to update the support post.')
                })
        }
    }

})()

    ; (function () {
        angular.module('client.main.pages.supportPosts')
            .component('supportPostsDetail', {
                templateUrl: 'client/main/pages/support.posts/detail/support.posts.detail.html',
                controller: 'supportPostsDetailController',
                bindings: {
                    supportPost: '<',
                    supporters: '<',
                    therapists: '<',
                    clients: '<'
                }
            })
    })()
