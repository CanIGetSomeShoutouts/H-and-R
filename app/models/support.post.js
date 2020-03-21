"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)



const schema = {
    subject: Joi.string().max(100).required(),
    contentHtml: Joi.string().max(5000).required(),
    clientId: Joi.objectId().required(),
    _id: Joi.objectId(),
    viewerIds: Joi.array().min(1).items(Joi.objectId()).required()
}

module.exports = Joi.object().keys(schema)


