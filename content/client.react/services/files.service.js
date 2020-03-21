"use strict"

const axios = require('axios')

module.exports = {
    upload: _upload,
    delete: _delete
}

function _upload(file) {

    return axios.get(`/api/files/sign`, { params: { name: file.name, type: file.type } })
        .then(res => { return res })
        .then(res => {
            return axios.put(res.data.item.url, file, { headers: { 'Content-Type': file.type } })
        })
        .catch(onError)
}

function _delete(file) {
    return axios.delete(`/api/files/delete/${file.name}`)
        .then(res => $log.log(res))
        .catch(onError)
}

function onError(error) {
    console.warn(error)
    return Promise.reject(error)
}
