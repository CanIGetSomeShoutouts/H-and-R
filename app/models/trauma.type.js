"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    name: Joi.string().max(30).required(),
    summary: Joi.string().max(500).required(),
    description: Joi.string().max(1000).required(),
    isDraft: Joi.boolean().allow(null),
    _id: Joi.objectId(),
}

module.exports = Joi.object().keys(schema)
