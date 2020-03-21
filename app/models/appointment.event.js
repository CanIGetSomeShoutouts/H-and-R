'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    title: Joi.string().required().max(50),
    description: Joi.string().required().max(50),
    addressId: Joi.objectId().allow(null, ""),
    participantIds: Joi.array().items(Joi.objectId()),
    teleconferenceInfo: Joi.string().max(1000).allow(null, ""),
    date: Joi.date().required()
}

module.exports = Joi.object().keys(schema)
