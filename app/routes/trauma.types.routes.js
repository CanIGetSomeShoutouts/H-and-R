"use strict"

const router = require('express').Router()
const traumaTypesControllerFactory = require('../controllers/trauma.types.controller')
const validateBody = require('../filters/validate.body')
const traumaTypes = require('../models/trauma.type')
const idFilters = require('../filters/id.filter')

module.exports = apiPrefix => {
    const traumaTypesController = traumaTypesControllerFactory(apiPrefix)

    //put API routes here
    router.get('/', traumaTypesController.read)
    router.get('/:id([0-9a-fA-F]{24})', traumaTypesController.readById)
    router.post('/', validateBody(traumaTypes), idFilters.bodyIdDisallowed, traumaTypesController.create)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(traumaTypes), idFilters.putIdsIdentical, idFilters.bodyIdRequired, traumaTypesController.update)
    router.delete('/:id([0-9a-fA-F]{24})', traumaTypesController.deactivate)
    router.get('/published', traumaTypesController.readPublished)
    return router
}
