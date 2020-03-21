/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
; (function () {
    'use strict'
    angular.module('client.services')
        .factory('intakeFormsService', intakeFormsServiceFactory)

    intakeFormsServiceFactory.$inject = ['$http', '$q']

    function intakeFormsServiceFactory($http, $q) {
        return {
            read: read,
            readById: readById,
            create: create,
            update: update,
            delete: _delete
        }

        function read() {
            return $http.get('/api/intake-forms')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/intake-forms/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }
        function create(intakeFormData) {
            return $http.post('/api/intake-forms', intakeFormData)
                .then(xhrSuccess)
                .catch(onError)
        }
        function update(intakeFormData) {
            return $http.put(`/api/intake-forms/${intakeFormData._id}`, intakeFormData)
                .then(xhrSuccess)
                .catch(onError)
        }
        function _delete(id) {
            return $http.delete(`/api/intake-forms/${id}`)
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
})();

