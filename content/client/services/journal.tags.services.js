;
(function() {
    'use strict';

    angular.module('client.main').factory('tagsService', TagsServiceFactory);

    TagsServiceFactory.$inject = ['$http', '$q'];

    function TagsServiceFactory($http, $q) {
        return {
            read: read,
            readById: readById,
            readSiteWide: _readSiteWide,
            readByClientId: _readByClientId,
            create: create,
            update: update,
            delete: _delete,
            readIcons: _readIcons,
            createIcons: _createIcons,
            readIconById: _readIconById
        };

        function _readIconById(IconId) {
            return $http.get(`/api/journal-tags/icons/${IconId}`).then(onSuccess).catch(onError)
        }

        function _createIcons(iconData) {
            return $http.post('/api/journal-tags/icons', iconData).then(onSuccess).catch(onError)
        }

        function _readSiteWide() {
            return $http.get('/api/journal-tags/site-wide').then(onSuccess).catch(onError)
        }

        function _readByClientId(clientId) {
            return $http.get(`/api/journal-tags?clientId=${clientId}`).then(onSuccess).catch(onError)
        }

        function read() {
            return $http.get('/api/journal-tags').then(xhrSuccess).catch(onError);
        }

        function _readIcons() {
            return $http.get('/api/journal-tags/icons').then(xhrSuccess).catch(onError)
        }

        function readById(id) {
            return $http.get('/api/journal-tags/' + id).then(xhrSuccess).catch(onError);
        }

        function create(tagData) {
            return $http.post('/api/journal-tags/', tagData).then(xhrSuccess).catch(onError);
        }

        function update(tagData) {
            return $http.put('/api/journal-tags/' + tagData._id, tagData).then(xhrSuccess).catch(onError);
        }

        function _delete(id) {
            return $http.delete('/api/journal-tags/' + id).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data);
        }
    }
})();
