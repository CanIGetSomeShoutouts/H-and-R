/* global angular */
; (function () {
    "use strict"

    angular.module('client.services')
        .factory('filesService', FilesServiceFactory)

    FilesServiceFactory.$inject = ['$http', '$q', '$log', '$window']

    function FilesServiceFactory($http, $q, $log, $window) {
        return {
            upload: _upload,
            delete: _delete
        }

        function _upload(file) {

            return $http.get(`/api/files/sign`, { params: { name: file.name, type: file.type } })
                .then(res => { return res })
                .then(res => {
                    return $http.put(res.data.item.url, file, { headers: { 'Content-Type': file.type } })
                })
                .catch(onError)
        }

        function _delete(file) {
            return $http.delete(`/api/files/delete/${file.name}`)
                .then(res => $log.log(res))
                .catch(onError)
        }


        function onError(error) {
            $log.warn(error)
            return $q.reject(error)
        }

    }

})();