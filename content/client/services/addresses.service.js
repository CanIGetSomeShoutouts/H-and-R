
; (function () {
    "use strict"

    angular.module("client.services")
        .factory("addressesService", AddressesServiceFactory)

    AddressesServiceFactory.$inject = ["$http", "$q"]

    function AddressesServiceFactory($http, $q) {

        return {
            read: read,
            readById: readById,
            create: create,
            update: _update,
            delete: _delete,
            readMine: _readMine     
        }

        function read() {
            return $http.get("/api/addresses")
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/addresses/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(addressesData) {
          return $http
            .post("/api/addresses", addressesData)
            .then(xhrSuccess)
            .catch(onError);
        }

        function _update(addressesData) {
          return $http
            .put(`/api/addresses/${addressesData._id}`, addressesData)
            .then(xhrSuccess)
            .catch(onError);
        }

        function _delete(id) {
            return $http.delete(`/api/addresses/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _readMine(id){
            return $http.get(`/api/addresses/mine/`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
          console.log(error.data);
          return $q.reject(error.data);
        }      
    }
})()
