"use strict"

const responses = require('../models/responses')
const questionnaireResponsesService = require('../services/questionnaire.responses.service')
let _apiPrefix // NOTE: _apiPrefix is utlized in our create function

// NOTE: we're exporting a function that accepts apiPrefix and returns an object that has all the method functions
module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    // just returning read for now
    return {
        readAll: _readAll,
        readById: _readById,
        create: _create,
        update: _update,
        deactivateData: _deactivateData
    }
}

function _readAll(req, res) {
    questionnaireResponsesService.readAll()
        .then(questionnaires => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = questionnaires
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _readById(req, res) {
    questionnaireResponsesService.readById(req.params.id)
        .then(questionnaireResponses => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = questionnaireResponses
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _create(req, res) {
    req.model.userId = req.auth.userId // NOTE: req.auth.userId is for knowing who is currently logged in (temporarily hardcoding )
    questionnaireResponsesService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemsResponse()
            responseModel.item = id
            res.status(201)
                .location(`${_apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _update(req, res) {
    questionnaireResponsesService
        .update(req.params.id, req.model)
        .then(questionnaireResponses => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _deactivateData(req, res) {
    questionnaireResponsesService
        .deactivateData(req.params.id)
        .then(questionnaireResponses => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}
