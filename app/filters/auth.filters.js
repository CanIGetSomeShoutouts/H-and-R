"use strict"

const responses = require("../models/responses")

module.exports = {
    isAdmin: _isAdmin
}

function _isAdmin(req, res, next) {
    if (req.auth.userType === "Admin") {
        next()
    }
    else {
        console.warn("You must be an admin to upload icons.")
        res.status(400).send(new responses.ErrorResponse("You must be an admin to upload icons."))
    }
}

