/* global angular */
; (function () {
    "use strict"

    angular.module('client.main.pages.files')
        .controller('filesController', FilesController)

    FilesController.$inject = ['filesService', '$log', '$scope', '$window', '$parse', 'uiNotificationsService']

    function FilesController(filesService, $log, $scope, $window, $parse, uiNotificationsService) {

        const vm = this

        vm.filesInput = null
        vm.filesInputEmpty = null
        vm.filesUploaded = null
        vm.style = null
        vm.message = null
        vm.showError = null
        vm.$onInit = $init
        vm.upload = _upload
        vm.delete = _delete


        function $init() {
            vm.message = "Please select a file"
            vm.showError = false
            vm.filesInputEmpty = true
            vm.filesUploaded = []
            vm.style = { list: { listStyle: 'none' }, image: { maxHeight: "48px", maxWidth: "48px" }, preview: { float: "left" } }
        }

        $scope.$watch(() => vm.filesInput, (newValue, oldValue) => {
            if (newValue) {
                if (newValue.length < 1) {
                    vm.message = "Please select a file"
                } else {
                    vm.message = `Files Selected: ${newValue.length}`
                    vm.filesInputEmpty = false
                    vm.showError = false
                }
            }
        })


        function _upload() {
            if (vm.filesInputEmpty) {
                vm.showError = true
                return
            }
            //Array.from method allows vm.files to call forEach and cycle through FileList Object
            Array.from(vm.filesInput).forEach(file => {
                filesService.upload(file)
                    .then(res => {
                        let userUrl = res.config.url.substr(0, 40) + res.config.url.substr(76, res.config.url.length)
                        let data = {
                            name: res.config.data.name,
                            type: res.config.data.type,
                            url: res.config.url,
                            size: res.config.data.size,
                            displayUrl: userUrl
                        }
                        vm.filesUploaded.push(data)
                    }).catch(err => {
                        $log.log(err)
                        uiNotificationsService.error(`An error has occured, while uploading ${file.name}`)
                    })
            })
            vm.message = "Please select a file"
            vm.filesInputEmpty = true
        }

        function _delete(file) {
            filesService.delete(file)
                .then(() => {
                    let removeIndex = vm.filesUploaded.findIndex(element => element.name === file.name)
                    vm.filesUploaded.splice(removeIndex, 1)
                    uiNotificationsService.success(`${file.name} successfully deleted!`)
                }).catch(err => $log.warn(err))
        }
    }
})();

; (function () {
    angular.module('client.main.pages.files')
        .component('files', {
            templateUrl: 'client/main/pages/files/files.html',
            controller: 'filesController',
            bindings: {
            }
        })
})();