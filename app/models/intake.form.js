"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    therapistId: Joi.objectId().required(),
    traumaTypeIds: Joi.array().items(Joi.objectId()),
    insuranceProvider: Joi.string().max(100).required(),
    currentPlace: Joi.string().max(1000).required(),
    history: Joi.string().max(2000).required(),
    traumaDate: Joi.string()
}

module.exports = Joi.object().keys(schema)