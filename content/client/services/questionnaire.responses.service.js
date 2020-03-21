/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */

// NOTE: function factory for our services (We are also putting this in client.services module)
;(function() {
    'use strict'

    angular.module('client.services')
        .factory('questionnaireResponsesService', QuestionnaireResponsesServiceFactory)

    QuestionnaireResponsesServiceFactory.$inject = ['$http', '$q']

    function QuestionnaireResponsesServiceFactory($http, $q) {
        return {
            readAll: _readAll,
            create: _create,
            readById: _readById,
            update: _update,
            deactivateData: _deactivateData
        }

        function _readAll() {
            return $http.get('/api/questionnaire-responses')
                .then(xhrSuccess)
                .catch(onError)
        }

        function _readById(id) {
            return $http.get(`/api/questionnaire-responses/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _create(questionnaireResponseData) {
            return $http.post('/api/questionnaire-responses', questionnaireResponseData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _update(questionnaireResponsesData) {
            return $http.put(`/api/questionnaire-responses/${questionnaireResponsesData._id}`, questionnaireResponsesData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _deactivateData(id) {
            return $http.delete(`/api/questionnaire-responses/deactivate/${id}`)
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
