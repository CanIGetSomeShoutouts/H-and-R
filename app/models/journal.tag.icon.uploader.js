//joi Validation will go here ===============================

"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
        set: Joi.string().max(20).required()
}

module.exports = Joi.object().keys(schema)