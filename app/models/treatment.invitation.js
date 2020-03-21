"use strict"

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const InviteSchema = {
    firstName: Joi.string().regex(/^[A-zÀ-ÿ]{2,16}$/).required(),
    lastName: Joi.string().regex(/^[A-zÀ-ÿ]{2,20}$/).required(),
    email: Joi.string().email().when('username', { is: Joi.string().exist(), then: Joi.allow(null, ""), otherwise: Joi.required() }),
    username: Joi.string().regex(/^[a-zA-Z0-9-_]{5,18}$/),
    _id: Joi.objectId()
}

module.exports = Joi.object().keys(InviteSchema)
