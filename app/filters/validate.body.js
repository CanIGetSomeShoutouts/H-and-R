'use strict'

const responses = require('../models/responses')

module.exports = validate

function validate(model) {
    
    return (req, res, next) => {
        const result = model.validate(req.body, { stripUnknown: { arrays: false, objects: true } })
        if (result.error) {
            console.warn(result.error)
            let response = new responses.ErrorResponse(result.error.details)
            res.status(400).json(response)
            return
        }
        req.model = result.value
        delete req.body
        next()
    }
}
