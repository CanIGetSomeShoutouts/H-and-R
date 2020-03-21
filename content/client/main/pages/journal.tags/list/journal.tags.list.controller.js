; (function () {
    'use strict'

    angular.module('client.main.pages.journalTags')
        .controller('tagListController', TagListController)

    TagListController.$inject = ['tagsService', 'usersService', '$log', '$http', '$state', '$window', '$uibModal', 'uiNotificationsService']

    function TagListController(tagsService, usersService, $log, $http, $state, $window, $uibModal, uiNotificationsService) {
        const vm = this
        vm.$onInit = $init
        vm.read = _read
        vm.delete = _delete
        vm.openIconModal = _openIconModal

        function $init() {
            vm.journalTags = {}
            _read()

        }

        function _read() {
            tagsService.read()
                .then(data => {
                    vm.journalTags = data.items
                    for (let i = 0; i < vm.journalTags.length; i++) {
                        if (vm.journalTags[i].clientId) {
                            _usernameRead(vm.journalTags[i].clientId)
                                .then(data => {
                                    vm.journalTags[i].clientUsername = data
                                })
                                .catch(xhr => {
                                    vm.journalTags[i].clientUsername = "Error Retrieving Username"
                                })
                        }
                    }
                })
                .catch(data => $log.log("ERROR"))
        }

        function _delete(index) {
            uiNotificationsService.confirm('Are you sure you want to delete this journal tag?', 'Yes, delete', 'No, cancel')
                .then(data => {
                    if (!data) { return }
                    return tagsService.delete(vm.journalTags[index]._id)
                        .then(data => {
                            uiNotificationsService.success("Journal tag successfully deleted.")
                            vm.journalTags.splice(index, 1)
                        })
                        .catch(data => {
                            $log.log(`Error: ${data.errors}`)
                            uiNotificationsService.error('An error occurred while attempting to delete the journal tag.')
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

        function _openIconModal() {
            let modalInstance = $uibModal.open({
                animation: true,
                template: '<react-loader props="$resolve" react-component="IconUploader" />',
                resolve: {},
            })
            modalInstance.result.catch(function () { modalInstance.close(); })
        }
    }
    angular.module("client.main.pages.journalTags").component("listComponent", {
        templateUrl: 'client/main/pages/journal.tags/list/journal.tags.list.html',
        controller: 'tagListController as $ctrl',
        bindings: {
            tagInformation: '<'
        }
    });

})()
