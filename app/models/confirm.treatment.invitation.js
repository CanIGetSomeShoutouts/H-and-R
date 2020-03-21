"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema ={
    id: Joi.objectId()
}

module.exports = Joi.object().keys(schema)