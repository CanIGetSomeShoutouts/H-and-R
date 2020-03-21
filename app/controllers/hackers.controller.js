"use strict"

// NOTE: it's able to communicate with mongodb through hackerService
const responses = require("../models/responses")
const hackersService = require("../services/hackers.service")
let _apiPrefix

module.exports = apiPrefix => {
  _apiPrefix = apiPrefix
  return {
    read: read,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
  }
}

function read(req, res) {
  hackersService
    .read()
    .then(hackers => {
      const responseModel = new responses.ItemsResponse()
      responseModel.items = hackers
      res.json(responseModel)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(new responses.ErrorResponse(err))
    })
}

function readById(req, res) {
  hackersService
    .readById(req.params.id)
    .then(hacker => {
      const responseModel = new responses.ItemResponse()
      responseModel.item = hacker
      res.json(responseModel)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(new responses.ErrorResponse(err))
    })
}

function create(req, res) {
  // NOTE: req.auth.userId is for knowing who is currently logged in (temporarily hardcoding )
  req.model.userId = req.auth.userId
  hackersService
    .create(req.model)
    .then(id => {
      const responseModel = new responses.ItemResponse()
      responseModel.item = id
      res
        .status(201)
        .location(`${_apiPrefix}/${id}`)
        .json(responseModel)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(new responses.ErrorResponse(err))
    })
}

function update(req, res) {
  hackersService
    .update(req.params.id, req.model)
    .then(hacker => {
      const responseModel = new responses.SuccessResponse()
      res.status(200).json(responseModel)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(new responses.ErrorResponse(err))
    })
}

function _delete(req, res) {
  hackersService
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
