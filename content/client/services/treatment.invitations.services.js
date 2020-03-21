
; (function () {
    'use strict'

    angular.module('client.services')
        .factory('invitesService', InvitesServiceFactory)

    InvitesServiceFactory.$inject = [ '$http', '$q' ]

    function InvitesServiceFactory($http, $q) {
        return {
            read: _read,
            readById: _readById,
            create: _create,
            update: _update,
            delete: _delete,
            confirmTreatmentInvitation: _confirmTreatmentInvitation
        }

        function _read() {
            return $http.get('/api/treatment-invitations/')
                .then(onSuccess)
                .catch(onError)
        }

        function _readById(id) {
            return $http.get(`/api/treatment-invitations/${id}`)
                .then(onSuccess)
                .catch(onError)
        }

        function _create(data) {
            return $http.post('/api/treatment-invitations', data)
                .then(onSuccess)
                .catch(onError)
        }

        function _update(data) {
            let settings = {
                method: 'PUT',
                url: `/api/treatment-invitations/${data._id}`,
                data: data,
                headers: {'X-username': true}
            }
            return $http(settings)
                .then(onSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/treatment-invitations/${id}`)
                .then(onSuccess)
                .catch(onError)
        }

        function _confirmTreatmentInvitation(data){
            return $http.post(`/api/treatment-invitations/confirm`, data)
            .then(onSuccess)
            .catch(onError)
        }

        function onSuccess(response) {
            return response.data
        }

        function onError(xhr) {
            return $q.reject(xhr.data)
        }
    }
})()
