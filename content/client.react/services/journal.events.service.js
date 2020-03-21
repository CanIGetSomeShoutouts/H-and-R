"use strict"

const axios = require('axios')

function _read() {
    return axios.get('/api/journal-events')
        .then(onSuccess)
        .catch(onError)
}

function _readMyJournal() {
    return axios.get('/api/journal-events/my-journal')
        .then(onSuccess)
        .catch(onError)
}

function _readById(id) {
    return axios.get(`api/journal-events/${id}`)
        .then(onSuccess)
        .catch(onError)
}

function _readByUserId(userId) {
    return axios.get(`api/journal-events/user/${userId}`)
    .then(onSuccess)
    .catch(onError)
}

function _create(journalData) {
    return axios.post("/api/journal-events", journalData)
        .then(onSuccess)
        .catch(onError)
}

function _update(id, journalData) {
    return axios.put(`/api/journal-events/${id}`, journalData)
        .then(onSuccess)
        .catch(onError)
}

function _delete(id) {
    return axios.delete(`/api/journal-events/${id}`)
        .then(onSuccess)
        .catch(onError)
}

function onSuccess(response) {
    return response.data
}

function onError(xhr) {
    console.log(xhr)
    return Promise.reject(xhr.data)
}

module.exports = {
    read: _read,
    readMyJournal: _readMyJournal,
    readByUserId: _readByUserId,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}
