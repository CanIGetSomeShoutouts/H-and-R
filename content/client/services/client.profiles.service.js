; (function () {
    'use strict'

    angular.module('client.main')
        .factory('clientProfileServices', ClientProfileServices)

    ClientProfileServices.$inject = ['$http', '$q']

    function ClientProfileServices($http, $q, $log) {
        return {
            read: read,
            readById: readById,
            create: create,
            update: update,
            delete: _delete,

        }

        function read() {
            return $http.get('/api/client-profiles')
                .then(xhrSuccess)
                .catch(err => {
                    return $q.reject(err)
                })
        }


        function readById(id) {
            return $http.get(`/api/client-profiles/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(profileData) {
            return $http.post('/api/client-profiles/createProfile', profileData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(profileData, id) {
            return $http.put(`/api/client-profiles/createProfile/${id}`, profileData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/client-profiles/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data)
            return $q.reject(error.data)
        }
    }
})()


