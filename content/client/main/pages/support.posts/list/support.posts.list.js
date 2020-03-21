/* global angular */;
(function () {
    'use strict'

    angular.module('client.main.pages.supportPosts')
        .controller('supportPostsListController', SupportPostsListController)

    SupportPostsListController.$inject = ['supportPostsService', '$log', 'usersService', 'uiNotificationsService']

    function SupportPostsListController(supportPostsService, $log, usersService, uiNotificationsService) {

        const vm = this
        vm.deactivate = _deactivate
        vm.$onInit = $init

        function $init() {
            vm.formData = {}
            vm.supportPosts
            for (let i = 0; i < vm.supportPosts.length; i++) {
                _usernameRead(vm.supportPosts[i].clientId)
                    .then(data => {
                        vm.supportPosts[i].clientUsername = data
                    })
                    .catch(xhr => {
                        vm.supportPosts[i].clientUsername = "Error Retrieving Username."
                    })
            }

        }

        function _deactivate(id) {
            uiNotificationsService.confirm("Are you sure you want to delete this support post?", "Yes, delete", "No, cancel")
                .then(response => {
                    if (!response) { return }
                    supportPostsService.deactivate(vm.formData)
                        .then(data => {
                            let removeIndex = vm.supportPosts.findIndex(element => element._id === id)
                            vm.supportPosts.splice(removeIndex, 1)
                            uiNotificationsService.success("Support post successfully deleted.")
                        })
                        .catch(data => {
                            $log.log(`Error: ${data.errors}`)
                            uiNotificationsService.error('An error occurred while attempting delete the support post.')
                        })
                })
        }

        function _usernameRead(id) {
            return usersService.readById(id)
                .then(user => {
                    return user.item.username
                })
                .catch(xhr => {
                    $log.log("Error", xhr)
                })
        }

    }
})();

; (function () {
    angular
        .module('client.main.pages.supportPosts')
        .component('supportPostsList', {
            templateUrl: 'client/main/pages/support.posts/list/support.posts.list.html',
            controller: 'supportPostsListController',
            bindings: {
                supportPosts: '<'
            }


        })

})();



