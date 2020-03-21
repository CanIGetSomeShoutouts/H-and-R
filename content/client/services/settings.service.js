/* global angular */
; (function () {
    "use strict"

    angular.module('client.services')
        .factory('settingsService', SettingsServiceFactory)

    SettingsServiceFactory.$inject = ['$http', '$q']

    function SettingsServiceFactory($http, $q) {
        return {
            getEnv: _getEnv
        }

        function _getEnv(){
            return $http.get("/api/settings")
                .then(onSuccess)
                .catch(onError)
        }

        function onSuccess(response) {
            return $q.resolve(response.data)
        }

        function onError(xhr) {
            return $q.reject(xhr.data)
        }

    }

})();