'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    currentPassword: Joi.string().regex(/^[a-zA-Z]{6-24}$/).required(),
    newPassword: Joi.string().regex(/^[a-zA-Z]{6-24}$/).required(),
    confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().options({ language: { any: { allowOnly: 'must match password' } } })
}

module.exports = Joi.object().keys(schema)