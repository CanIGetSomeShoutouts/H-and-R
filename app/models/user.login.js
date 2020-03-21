"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const userLoginSchema = {
    username: Joi.string().regex(/^[a-zA-Z0-9-_]{5,18}$/).required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{6,24}$/).required()
}

module.exports = Joi.object().keys(userLoginSchema)
