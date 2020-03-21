"use strict"

const responses = require('../models/responses');
const supportPostsService = require('../services/support.posts.service')
const sanitizeHtmlService = require('../services/sanitize.html.service')
let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: read,
        readById: readById,
        create: create,
        update: update,
        deactivate: _deactivate,
        readByClientId: _readByClientId
    }
}

function read(req, res) {
    supportPostsService.read()
        .then(posts => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = posts
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function readById(req, res) {
    supportPostsService.readById(req.params.id)
        .then(post => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = post
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _readByClientId(req, res) {
    supportPostsService.readByClientId(req.params.id, req.auth.userId) 
      .then(testSupport => {
        const responseModel = new responses.ItemResponse()
        responseModel.item = testSupport
        res.json(responseModel)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(new responses.ErrorResponse(err))
      })

    }

function create(req, res) {
    req.model.userId = req.auth.userId
    req.model.contentHtml = sanitizeHtmlService.cleanHtml(req.model.contentHtml)
    supportPostsService.create(req.model)
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

function update(req, res) {
    req.model.contentHtml = sanitizeHtmlService.cleanHtml(req.model.contentHtml)
        supportPostsService
            .update(req.params.id, req.model)
            .then(post => {
                const responseModel = new responses.SuccessResponse()
                res.status(200).json(responseModel)
            })
            .catch(err => {
                console.log(err)
                res.status(500).send(new responses.ErrorResponse(err))
            })
}

function _deactivate(req, res) {
        supportPostsService
            .deactivate(req.params.id)
            .then(post => {
                const responseModel = new responses.SuccessResponse()
                res.status(200).json(responseModel)
            })
            .catch(err => {
                console.log(err)
                res.status(500).send(new responses.ErrorResponse(err))
            })
 
}

