;
(function() {
    "use strict"

    angular.module('client.main.pages.users')
        .controller('usersListController', UsersListController)

    UsersListController.$inject = ['usersService', '$log', '$state', 'uiNotificationsService']

    function UsersListController(usersService, $log, $state, uiNotificationsService) {
        const vm = this
        vm.users = []

        vm.delete = _delete
        vm.click = _click
        vm.$onInit = $init

        function $init() {
            vm.users = vm.usersList
        }

        function _click(userId) {
            $state.go('main.users.detail', { id: userId })
        }

        function _delete(id, index) {
            uiNotificationsService.confirm("Are you sure you want to delete this user?", "Yes, delete", "No, cancel")
                .then(data => {
                    if (!data) { return }
                    return usersService.delete(id, vm.users)
                        .then(response => {
                            $log.log(response)
                            uiNotificationsService.success("User succesfully deleted.")
                            vm.users.splice(index, 1)
                        })
                        .catch(xhr => {
                            $log.log(xhr)
                            uiNotificationsService.error("An error occurred while attempting to delete the user.")
                        })
                })
        }

    }
})();;
(function() {
    angular.module('client.main.pages.users')
        .component('usersList', {
            templateUrl: "client/main/pages/users/list/users.list.html",
            controller: "usersListController",
            bindings: {
                usersList: '<'
            }
        })
})();
