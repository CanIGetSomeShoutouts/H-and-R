"use strict"

const responses = require('../models/responses');
const traumaTypesService = require('../services/trauma.types.service')
let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: read,
        readById: readById,
        create: create,
        update: update,
        deactivate: deactivate,
        readPublished: _readPublished
    }
}
function _readPublished(req, res) {
    traumaTypesService.readPublished()
        .then(traumaTypes => {
            const responseModel = new responses.ItemResponse()
            responseModel.items = traumaTypes
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}
//express middleware function
//controller goes between express and back end 
function read(req, res) {
    traumaTypesService.read()
        //returns promise
        .then(traumaTypes => {
            const responseModel = new responses.ItemResponse()
            responseModel.items = traumaTypes
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function readById(req, res) {
    traumaTypesService.readById(req.params.id)
        .then(traumaTypes => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = traumaTypes
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

//when you pass an object w/ appropriate properties it should appear in robo
//if extra properties are included they shouldn't appear in robo
function create(req, res) {
    req.model.userId = req.auth.userId
    //request to the model payload
    traumaTypesService.create(req.model)
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

// pass in an object if (string) then check robo for changes
function update(req, res) {
    traumaTypesService.update(req.params.id, req.model)
        .then(traumaTypes => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

//function should be called deactive in the mongo service
// can still be called delete in the controller 

function deactivate(req, res) {
    traumaTypesService.delete(req.params.id)
        .then(traumaTypes => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}
