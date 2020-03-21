/* global angular */
/* connected to 'routes/widgets/routes/js' */

; (function () {
    'use strict'

    angular.module('client.services')
        .factory('appointmentEventsService', AppointmentEventsServicesFactory)

    AppointmentEventsServicesFactory.$inject = ['$http', '$q']

    function AppointmentEventsServicesFactory($http, $q) {
        return {
            read: read,
            readById: readById,
            readByUserId: _readByUserId,
            create: create,
            update: update,
            delete: _delete,
        }

        function read() {
            return $http.get('/api/appointment-events')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/appointment-events/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _readByUserId(userId, therapistId) {
            return $http.get(`/api/appointment-events/user/${userId}?therapistId=${therapistId}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(appointmentEventData) {
            return $http.post('/api/appointment-events/', appointmentEventData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(appointmentEventData) {
            return $http.put(`/api/appointment-events/${appointmentEventData._id}`, appointmentEventData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/appointment-events/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            return $q.reject(error.data)
        }
    }
})()
