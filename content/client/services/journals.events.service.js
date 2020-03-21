; (function () {
  "use strict"

  angular
    .module("client.services")
    .factory("journalsEventsService", JournalsServiceFactory)

  JournalsServiceFactory.$inject = ["$http", "$q"]

  function JournalsServiceFactory($http, $q) {
    return {
      read: _readAll,
      readById: _readById,
      readMyJournal: _readMyJournal,
      create: _create,
      update: _update,
      delete: _delete
    }

    function _readAll() {
      return $http
        .get("/api/journal-events")
        .then(xhrSuccess)
        .catch(onError)
    }

    function _readById(id) {
      return $http
        .get(`/api/journal-events/${id}`)
        .then(xhrSuccess)
        .catch(onError)
    }

    function _readMyJournal() {
      return $http
        .get('/api/journal-events/my-journal')
        .then(onSuccess)
        .catch(onError)
    }

    function _create(journalData) {
      return $http
        .post("/api/journal-events", journalData)
        .then(xhrSuccess)
        .catch(onError)
    }

    function _update(id, journalData) {
      return $http
        .put(`/api/journal-events/${id}`, journalData)
        .then(xhrSuccess)
        .catch(onError)
    }

    function _delete(id) {
      return $http
        .delete(`/api/journal-events/${id}`)
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
