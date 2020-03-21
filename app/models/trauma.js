"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    beginDate: Joi.date().required().max('now'),
    endDate: Joi.date().min(Joi.ref('beginDate')).max('now').allow(null),
    type: Joi.string().valid('Single', 'Intermittent', 'Ongoing').allow('', null).optional(),
    summary: Joi.string().required().max(200),
    description: Joi.string().required().max(2000),
    viewerIds: Joi.array().items(Joi.objectId()).allow("", null),
    _id: Joi.objectId()
}

module.exports = Joi.object().keys(schema)



