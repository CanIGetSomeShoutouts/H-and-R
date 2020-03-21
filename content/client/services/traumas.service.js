
; (function () {
    'use strict'

    angular.module('client.services')
        .factory('traumaPostService', TraumaPostServiceFactory)

    TraumaPostServiceFactory.$inject = ['$http', '$q']

    function TraumaPostServiceFactory($http, $q) {
        return {
            read: read,
            readById: readById,
            create: create,
            update: update,
            delete: _delete,
            readMine: _readMine
        }

        function _readMine() {
            return $http.get('/api/traumas/my-traumas')
                .then(xhrSuccess)
                .catch(onError)
        }

        function read() {
            return $http.get('/api/traumas')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`api/traumas/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(formData) {
            return $http.post('/api/traumas', formData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(formData) {
            return $http.put(`/api/traumas/${formData._id}`, formData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/traumas/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data

        }

        function onError(error) {
            console.log(error)
            return $q.reject(error)
        }
    }
})()