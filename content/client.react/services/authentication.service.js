"use strict"

const cookie = require('react-cookies')

module.exports = {
    getCurrentUser: _getCurrentUser
}

function _getCurrentUser() {
    return JSON.parse(cookie.load('auth').slice(2))
}