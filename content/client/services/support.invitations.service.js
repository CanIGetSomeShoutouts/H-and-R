
; (function () {
    'use strict'

    angular.module('client.services')
        .factory('supportInvitationsService', SupportInvitationsServiceFactory)

    SupportInvitationsServiceFactory.$inject = ['$http', '$q']

    function SupportInvitationsServiceFactory($http, $q) {
        return {
            read: read,
            create: create,
            delete: _delete,
            confirm: _confirm
        }

        function read() {
            return $http.get('/api/support-invitations')
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(supportData) {
            return $http.post('/api/support-invitations', supportData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/support-invitations/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _confirm(inviteId, data) {
            return $http.post(`/api/support-invitations/confirm/${inviteId}`, data)
            .then(xhrSuccess)
            .catch(onError)
        }
        

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data)
            return Promise.reject(error.data)
        }


    }
})()