/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
;
(function () {
    'use strict'

    //this is a set of reusable functions that are all doing ajax calls
    angular.module('client.services').factory('traumaTypesService', TraumaTypesServiceFactory)
    //modules are like a bucket
    TraumaTypesServiceFactory.$inject = ['$http', '$q']

    function TraumaTypesServiceFactory($http, $q) {
        //service syntax 
        return {
            read: read,
            readById: readById,
            create: create,
            update: update,
            delete: _delete,
            readPublished: _readPublished
        }

        function _readPublished() {
            return $http.get('/api/trauma-types/published')
                .then(xhrSuccess)
                .catch(onError)
        }

        //ajax call should go to the api endpoint (trauma types). Gives you back a promise
        function read() {
            return $http.get('/api/trauma-types')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/trauma-types/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(traumaTypesData) {
            return $http.post('/api/trauma-types', traumaTypesData)
                .then(xhrSuccess)
                .catch(onError)
        }
        // trauma types data is the id in controller
        function update(traumaTypesData, id) {
            return $http.put(`/api/trauma-types/${id}`, traumaTypesData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/trauma-types/${id}`)
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
