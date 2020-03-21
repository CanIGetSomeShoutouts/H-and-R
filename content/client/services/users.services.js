;
(function() {
    "use strict"

    angular.module("client.services").factory("usersService", UsersService)

    UsersService.$inject = ["$http", "$q", "$state"]

    function UsersService($http, $q, $state) {
        return {
            read: _read,
            create: _create,
            update: _update,
            delete: _delete,
            readById: _readById,
            login: _login,
            logout: _logout,
            currentUser: _currentUser,
            readClients: _readClients,
            readTherapists: _readTherapists,
            readSupporters: _readSupporters,
            confirmEmail: _confirmEmail,
            readMySupporters: _readMySupporters,
            deleteSupporter: _deleteSupporter,
            confirmEmail: _confirmEmail,
            readMyClients: _readMyClients
        }

        function _readMyClients() {
            return $http.get('/api/users/my-supportees')
            .then(onSuccess)
            .catch(onError)
        }

        function _login(formData) {
            return $http.post('/api/users/login', formData)
        }

        function _read() {
            return $http
                .get("/api/users")
                .then(onSuccess)
                .catch(onError)
        }

        function _create(data) {
            return $http
                .post("/api/users", data)
                .then(onSuccess)
                .catch(onError)
        }

        function _update(id, data) {
            return $http
                .put(`/api/users/${id}`, data)
                .then(onSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http
                .delete(`/api/users/${id}`)
                .then(onSuccess)
                .catch(onError)
        }

        function _deleteSupporter(id, userId) {
            return $http.delete(`/api/users/${id}/supporters/${userId}`)
            .then(onSuccess)
            .catch(onError)
        }

        function _confirmEmail(data) {
            return $http
                .post(`/api/users/${data._id}/confirm-email`, data)
                .then(onSuccess)
                .catch(onError)
        }

        function _readById(id) {
            return $http.get(`/api/users/${id}`)
                .then(onSuccess)
                .catch(onError)
        }

        function _logout(data) {
            return $http.post('/api/users/logout')
                .then(onSuccess)
                .catch(onError)
        }

        function _currentUser() {
            return $http.get(`/api/users/current`)
                .then(onSuccess)
                .catch(onError)
        }

        function _readClients() {
            return $http.get('/api/users/clients')
                .then(onSuccess)
                .catch(onError)
        }

        function _readTherapists() {
            return $http.get('/api/users/therapists')
                .then(onSuccess)
                .catch(onError)
        }

        function _readMySupporters() {
            return $http.get('api/users/my-supporters')
                .then(onSuccess)
                .catch(onError)
        }
        function _readSupporters() {
            return $http.get('/api/users/supporters')
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