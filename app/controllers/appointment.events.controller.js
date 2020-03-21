'use strict'

const responses = require('../models/responses')
const appointmentEventsService = require('../services/appointment.events.service')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: read,
        readById: readById,
        readByUserId: readByUserId,
        create: _create,
        update: _update,
        delete: _delete
     
    }
}

function read(req, res) {
    appointmentEventsService.read()
        .then(appointmentEvents => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = appointmentEvents
            res.json(responseModel)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function readById(req, res) {
    appointmentEventsService.readById(req.params.id)
        .then(appointmentEvent => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = appointmentEvent
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function readByUserId(req, res) {
    appointmentEventsService.readByUserId(req.params.userId, req.query.therapistId)
        .then(response => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = response
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _create(req, res) {
    req.model.userId = req.auth.userId
    appointmentEventsService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemResponse()
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
    appointmentEventsService.update(req.params.id, req.model)
        .then(appointmentEvent => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    appointmentEventsService.delete(req.params.id)
        .then(appointmentEvent => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}


