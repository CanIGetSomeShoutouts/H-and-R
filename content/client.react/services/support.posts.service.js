const axios = require('axios')

function read() {
    return axios.get('/api/support-posts')
        .then(xhrSuccess)
        .catch(onError)
}

function readById(id) {
    return axios.get(`/api/support-posts/${id}`)
        .then(xhrSuccess)
        .catch(onError)
}

function readByClientId(userId) {
    return axios.get(`/api/support-posts/users/${userId}`)
        .then(xhrSuccess)
        .catch(onError)
}

function create(supportPostData) {
    return axios.post('/api/support-posts', supportPostData)
        .then(xhrSuccess)
        .catch(onError)
}

function update(supportPostData) {
    return axios.put(`/api/support-posts/${supportPostData._id}`, supportPostData)
        .then(xhrSuccess)
        .catch(onError)
}

function _deactivate(supportPostData) {
    return axios.delete(`/api/support-posts/${supportPostData._id}`, supportPostData)
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
    readByClientId: readByClientId,
    create: create,
    update: update,
    deactivate: _deactivate,

}
