"use strict"

const axios = require('axios')

function read() {
    return axios.get('/api/hackers')
        .then(xhrSuccess)
        .catch(onError)
}

function readById(id) {
    return axios.get(`/api/hackers/${id}`)
        .then(xhrSuccess)
        .catch(onError)
}

function create(hackerData) {
    return axios.post('/api/hackers', hackerData)
        .then(xhrSuccess)
        .catch(onError)
}

function update(hackerData) {
    return axios.put(`/api/hackers/${hackerData._id}`, hackerData)
        .then(xhrSuccess)
        .catch(onError)
}

function _delete(id) {
    return axios.delete(`/api/hackers/${id}`)
        .then(xhrSuccess)
        .catch(onError)
}

function xhrSuccess(response) {
    return response.data
}

function onError(error) {
    console.log(error.data)
    return Promise.reject(error.data)
}

module.exports = {
    read: read,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}
