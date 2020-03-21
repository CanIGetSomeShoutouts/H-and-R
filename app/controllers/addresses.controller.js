
"use strict"

const responses = require('../models/responses')
const addressesService = require('../services/addresses.service')
let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix

    return {
        read: _read,
        readMine: _readMine,
        readById: _readById,
        create: _create,
        update: _update,
        delete: _delete  
    }
}

function _read(req, res) {
    addressesService.read()
        .then(addresses => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = addresses
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function _readMine(req, res){
    addressesService.readByUserId(req.auth.userId)
        .then(addresses => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = addresses
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _readById(req, res) {
    addressesService.readById(req.params.id)
        .then(addresses => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = addresses
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}
 
function _create(req, res) {

    req.model.userId = req.auth.userId
    addressesService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = id
            res.status(200)
                .location(`${_apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _update(req, res) {
    addressesService
        .update(req.params.id, req.model)
        .then(addresses => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    addressesService
        .delete(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}