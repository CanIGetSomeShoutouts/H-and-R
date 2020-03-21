// NOTE: inside our models is where we have Joi validation implementation

'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    questionnaireId: Joi.objectId().required(),
    answers: Joi.array().items(Joi.object().keys({
        questionIndex: Joi.number().integer().min(0).required(),
        answerIndices: Joi.array().items(Joi.number().integer()).allow([]),
        text: Joi.string().allow(null, '')
    }))
}

module.exports = Joi.object().keys(schema)
