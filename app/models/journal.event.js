"use strict"

const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

const tags = Joi.array().items(
    Joi.object().keys({
        id: Joi.objectId().required(),
        severity: Joi.number().required()
    })
)

const schema = {
    _id: Joi.objectId(),
    eventDate: Joi.date().required(),
    title: Joi.string().max(50).required(),
    contentHtml: Joi.string().max(5000).allow(null, ''),
    traumaTypeIds: Joi.array().items(Joi.objectId()).default([]),
    emotionalTags: tags,
    physicalTags: tags,
    triggerTags: tags,
    socialTags: tags,
    isVisibleToCurrentSupporters: Joi.boolean().default(false),
    viewerIds: Joi.array().items(Joi.objectId()).default([]),
    comments: Joi.array().items(
        Joi.object({
            userId: Joi.objectId().required(),
            dateCreated: Joi.date().required(),
            content: Joi.string().max(500).required()
        })
    )
}

module.exports = Joi.object().keys(schema)
