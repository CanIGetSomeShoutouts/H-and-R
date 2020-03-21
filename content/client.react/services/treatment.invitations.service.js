"use strict"

const axios = require("axios")

module.exports = {
    read: _read,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function onSuccess(response) {
    return response.data
}

function onError(xhr) {
    return Promise.reject(xhr.data)
}

function _read() {
    return axios.get('/api/treatment-invitations/')
        .then(onSuccess)
        .catch(onError)
}

function _readById(id) {
    return axios.get(`/api/treatment-invitations/${id}`)
        .then(onSuccess)
        .catch(onError)
}

function _create(data) {
    return axios.post('/api/treatment-invitations', data)
        .then(onSuccess)
        .catch(onError)
}

function _update(data) {
    let settings = {
        method: 'PUT',
        url: `/api/treatment-invitations/${data._id}`,
        data: data,
        headers: { 'X-username': true }
    }
    return axios(settings)
        .then(onSuccess)
        .catch(onError)
}

function _delete(id) {
    return axios.delete(`/api/treatment-invitations/${id}`)
        .then(onSuccess)
        .catch(onError)
}
