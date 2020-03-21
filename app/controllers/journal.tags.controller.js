"use strict"

const responses = require('../models/responses');
const journalTagsService = require('../services/journal.tags.service')
const journalTagsIconService = require('../services/journal.tag.icons.service')
const JSZip = require('jszip')
let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: read,
        readById: readById,
        readIcons: readIcons,
        readIconById: readIconById,
        readSiteWide: readSiteWide,
        createIcons: createIcons,
        create: create,
        update: update,
        delete: _delete
    }
}


function readSiteWide(req, res) {
    journalTagsService.readSiteWide()
        .then(siteWideTags => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = siteWideTags
            res.json(responseModel)
        })
        .catch(error => {
            console.error(error)
            res.status(500).send(new responses.ErrorResponse(error))
        });
}

// NOTE: This should only fire from the read()
function _readByClientId(clientId, res) {
    journalTagsService.readByClientId(clientId)
        .then(clientJournalTags => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = clientJournalTags
            res.json(responseModel)
        })
        .catch(error => {
            console.error(error)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function read(req, res) {
    // check for query string
    let clientId = req.query.clientId
    if (clientId) {
        _readByClientId(clientId, res)
    } else {
        journalTagsService.read()
            .then(tags => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = tags
                res.json(responseModel)
            })
            .catch(error => {
                console.error(error)
                res.status(500).send(new responses.ErrorResponse(err))
            });
    }
}

function readIconById(req, res) {
    journalTagsIconService.read(req.params.id)
        .then(icon => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = icon
            res.json(responseModel)
        })
        .catch(error => {
            console.error(error)
            res.status(500).send(new responses.ErrorResponse(error))
        })
}

function readIcons(req, res) {
    journalTagsIconService.readIcons()
        .then(icons => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = icons
            res.json(responseModel)
        })
        .catch(error => {
            console.error(error)
            res.status(500).send(new responses.ErrorResponse(error))
        })
}

function readById(req, res) {
    journalTagsService.readById(req.params.id)
        .then(tag => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = tag
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    req.model.userId = req.auth.userId
    req.model.tagName = createTagName(req.model.tagName)
    journalTagsService.create(req.model)
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

function createIcons(req, res) {
    let imagePromises = []
    let zip = new JSZip()

    zip.loadAsync(req.file.buffer)
        .then(data => {
            for (let key in data.files) {
                imagePromises.push(
                    zip.file(key).async("nodebuffer")
                        .then(data => {
                            let payload = {
                                name: zip.file(key).name,
                                set: req.model.set,
                                data: data
                            }
                            return journalTagsIconService.createIcons(payload)
                        })
                )
            }
            Promise.all(imagePromises)
                .then(result => {
                    res.status(200).send(new responses.ItemResponse())
                })
                .catch(err => {
                    res.status(500).send(new responses.ErrorResponse(err))
                })
        })
}

function update(req, res) {
    journalTagsService
        .update(req.params.id, req.model)
        .then(tag => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    journalTagsService
        .delete(req.params.id, req.model)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}

function createTagName(name) {
    return name.toLowerCase().replace(/ /g, "-")
}
