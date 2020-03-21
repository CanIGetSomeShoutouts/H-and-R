/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
;
(function() {
    'use strict'

    angular.module('client.services')
        .factory('supportPostsService', SupportPostsServiceFactory)

    SupportPostsServiceFactory.$inject = ['$http', '$q']

    function SupportPostsServiceFactory($http, $q) {
        return {
            read: read,
            readById: readById,
            create: create,
            update: update,
            deactivate: _deactivate,
        }

        function read() {
            return $http.get('/api/support-posts')
                .then(xhrSuccess)
                .catch(onError)

            }

            function readById(id) {
                return $http.get(`/api/support-posts/${id}`)
                    .then(xhrSuccess)
                    .catch(onError)
            }


            function create(supportPostData) {
                return $http.post('/api/support-posts', supportPostData)
                    .then(xhrSuccess)
                    .catch(onError)
            }


            function update(supportPostData) {
                return $http.put(`/api/support-posts/${supportPostData._id}`, supportPostData)
                    .then(xhrSuccess)
                    .catch(onError)
            }
            
            
            function _deactivate(supportPostData) {
                return $http.delete(`/api/support-posts/${supportPostData._id}`, supportPostData)
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
