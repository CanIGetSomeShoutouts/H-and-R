; (function () {
    'use strict'

    angular.module('client.services').factory('questionnairesService', QuestionnairesServiceFactory)

    QuestionnairesServiceFactory.$inject = ['$http', '$q']

    function QuestionnairesServiceFactory($http, $q) {
        return {
            read: read,
            createQuestionnaire: createQuestionnaire,
            updateQuestionnaire: updateQuestionnaire,
            readQuestionnaireById: readQuestionnaireById,
            delete: _delete
        }

        function read() {
            return $http.get('/api/questionnaires')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readQuestionnaireById(id) {
            return $http.get(`/api/questionnaires/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }


        function createQuestionnaire(questionnaireData) {
            return $http.post('/api/questionnaires', questionnaireData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function updateQuestionnaire(questionnaireData) {
            return $http.put(`/api/questionnaires/${questionnaireData._id}`, questionnaireData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/questionnaires/${id}`)
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