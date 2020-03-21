"use strict"

const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

const emailSchema = {
  _id: Joi.objectId().required()
}

module.exports = Joi.object().keys(emailSchema)
