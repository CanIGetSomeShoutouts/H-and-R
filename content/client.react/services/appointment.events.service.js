"use strict"

const axios = require('axios')

function _read() {
    return axios.get('/api/appointment-events')
        .then(xhrSuccess)
        .catch(onError)
}

function _readById(id) {
    return axios.get(`/api/appointment-events/${id}`)
        .then(xhrSuccess)
        .catch(onError)
}

function _readByUserId(userId, therapistId) {
    return axios.get(`/api/appointment-events/user/${userId}?therapistId=${therapistId}`)
        .then(xhrSuccess)
        .catch(onError)
}

function _create(appointmentData) {
    return axios.post('/api/appointment-events', appointmentData)
        .then(xhrSuccess)
        .catch(onError)
}

function _update(appointmentEventData) {
    return $axios.put(`/api/appointment-events/${appointmentEventData._id}`, appointmentEventData)
        .then(xhrSuccess)
        .catch(onError)
}

function readMine(id){
    return axios.get(`/api/addresses/mine/`)
        .then(xhrSuccess)
        .catch(onError)
}

function _delete(id) {
    return axios.delete(`/api/appointment-events/${id}`)
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
    read: _read,
    readById: _readById,
    readByUserId: _readByUserId,
    create: _create,
    update: _update,
    delete: _delete,
    readMine: readMine
}