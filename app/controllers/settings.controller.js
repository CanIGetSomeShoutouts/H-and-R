"use strict"

const responses = require('../models/responses')
const dotenv = require('dotenv')
let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: read
    }
}

function read(req, res) {
    const responseModel = new responses.ItemResponse()
        responseModel.item = process.env.FROM_ADDRESS
        res.status(200).send(responseModel)
}

