const axios = require('axios')

module.exports = {
    currentUser: _currentUser,
    read: read,
    readById: readById,
    create: create,
    update: update,
    delete: _delete,
    readMine: _readMine,
    readByUserId: _readByUserId
}

function xhrSuccess(response) {
    return response.data
}

function onError(error) {
    console.log(error)
    return $q.reject(error)
}

function _currentUser() {
    return axios.get(`/api/users/current`)
        .then(xhrSuccess)
        .catch(onError)
}

function _readByUserId(id) {
    return axios.get(`/api/traumas/users/${id}`)
        .then(xhrSuccess)
        .catch(onError)
}

function _readMine() {
    return axios.get('/api/traumas/my-traumas')
        .then(xhrSuccess)
        .catch(onError)
}

function read() {
    return axios.get('/api/traumas')
        .then(xhrSuccess)
        .catch(onError)
}

function readById(id) {
    return axios.get(`api/traumas/${id}`)
        .then(xhrSuccess)
        .catch(onError)
}

function create(formData) {
    return axios.post('/api/traumas', formData)
        .then(xhrSuccess)
        .catch(onError)
}

function update(formData) {
    return axios.put(`/api/traumas/${formData._id}`, formData)
        .then(xhrSuccess)
        .catch(onError)
}

function _delete(id) {
    return axios.delete(`/api/traumas/${id}`)
        .then(xhrSuccess)
        .catch(onError)
}
