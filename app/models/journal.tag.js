"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {

    _id: Joi.objectId(),
    name: Joi.string().min(2).max(50).required(),
    tagName: Joi.string().min(2).max(50).required(),
    type: Joi.string().valid("Emotional", "Physical", "Social", "Trigger").required(),
    summary: Joi.string().required().min(10).max(1000),
    severityMin: Joi.number().less(Joi.ref('severityMax')).required(),
    severityMax: Joi.number().greater(Joi.ref('severityMin')).required(),
    severityStep: Joi.number().min(1).required(),
    alertThreshold: Joi.number().min(Joi.ref('severityMin')).max(Joi.ref('severityMax')).when('clientId', {is: Joi.string().exist(), then: Joi.allow(null, ""), otherwise: Joi.required()}),
    clientId : Joi.objectId().allow(null, ""),
    iconId: Joi.objectId().required()

}

module.exports = Joi.object().keys(schema)