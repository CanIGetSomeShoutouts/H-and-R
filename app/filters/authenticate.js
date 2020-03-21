"use strict"

module.exports = authenticate

function authenticate(req, res, next) {
    // req.auth should contain information related to the logged-in user, stored and passed
    // between web server and client via auth cookie.

    // middleware that has the hexa id from the .env

    if (req.cookies.auth) {
        req.auth = req.cookies.auth
    }
    next()
}


