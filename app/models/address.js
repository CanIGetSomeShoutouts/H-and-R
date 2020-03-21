
"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    lineOne: Joi.string().min(2).max(80).required(),
    lineTwo: Joi.string().optional().allow(null, '').default(null),
    city: Joi.string().max(30).required(),
    stateCode: Joi.string().max(3).required(),
    postalCode: Joi.string().required().min(2).max(30),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    _id: Joi.objectId()
}

module.exports = Joi.object().keys(schema)


