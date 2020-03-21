const axios = require('axios')


function _readJournalEventsById(id) {
    return axios.get(`/api/journal-events/${id}`)
        .then(onSuccess)
        .catch(onError)
}

function _readTraumaTypes() {
    return axios.get('/api/trauma-types')
        .then(onSuccess)
        .catch(onError)
}

function _readByIdTraumaType(id) {
    return axios.get(`/api/trauma-types/${id}`)
        .then(onSuccess)
        .catch(onError)
}

function _readPublished() {
    return axios.get('/api/trauma-types/published')
        .then(onSuccess)
        .catch(onError)
}

function _readByIdJournalTags(id) {
    return axios.get(`/api/journal-tags/${id}`)
        .then(onSuccess)
        .catch(onError)
}

function _readJournalTags() {
    return axios.get('/api/journal-tags')
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
    readTraumaTypeId: _readByIdTraumaType,
    readTraumaType: _readTraumaTypes,
    readPublished: _readPublished,
    readJournalTagId: _readByIdJournalTags,
    readJournalTags: _readJournalTags,
    readJournalEventsId: _readJournalEventsById

}

