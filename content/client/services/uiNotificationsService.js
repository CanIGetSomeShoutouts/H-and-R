;
(function() {
    'use strict'
    angular.module('client.services').factory('uiNotificationsService', UiNotificationsService)

    UiNotificationsService.$inject = ['$http', '$q', '$uibModal', '$window']

    function UiNotificationsService($http, $q, $uibModal, $window) {

        return {
            success: _success,
            error: _error,
            confirm: _confirm
        }

        function _success(message) {
            return $window.$.gritter.add({
                title: message,
                text: '',
                sticky: true,
            })
        }

        function _error(message) {
            return $window.$.gritter.add({
                title: message,
                text: '',
                sticky: true,
                class_name: 'uiNotifications-error'
            })
        }

        function _confirm(question, confirmText, cancelText) {
            return $uibModal.open({
                animation: true,
                component: 'confirmModal',
                resolve: {
                    messages: function() {
                        return {
                            question: question,
                            confirmText: confirmText,
                            cancelText: cancelText
                        }
                    }
                }
            }).result
        }

    }
})();
