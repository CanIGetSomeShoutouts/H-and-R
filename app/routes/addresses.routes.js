"use strict"

const router = require('express').Router()
const addressesControllerFactory = require('../controllers/addresses.controller') 
const addressesApiPrefix = '/api/addresses' 
const validateBody = require('../filters/validate.body')
const address = require('../models/address')
const idFilterJs = require("../filters/id.filter")

module.exports = apiPrefix => {
    const addressesController = addressesControllerFactory(apiPrefix)

    // api routes ===========================================================
    router.get('/', addressesController.read)
    router.get('/:id([0-9a-fA-F]{24})', addressesController.readById)
    router.get('/mine', addressesController.readMine)
    router.post('/', validateBody(address), idFilterJs.bodyIdDisallowed, addressesController.create)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(address), idFilterJs.bodyIdRequired, idFilterJs.putIdsIdentical, addressesController.update)
    router.delete('/:id([0-9a-fA-F]{24})', addressesController.delete)
    return router
}