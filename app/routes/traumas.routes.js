//express entity router
"use strict"


const router = require('express').Router()
const mongodb = require('../mongodb')
const traumaPostController = require('../controllers/traumas.controller')
const validateBody = require('../filters/validate.body')
const Trauma = require('../models/trauma')
const idFilter = require("../filters/id.filter")

module.exports = apiPrefix => {
    const traumaController = traumaPostController(apiPrefix)


    //api routes ================================================================
    router.get('/', traumaController.read)
    router.get('/:id([0-9a-fA-F]{24})', traumaController.readById)
    router.post('/', validateBody(Trauma), idFilter.bodyIdDisallowed, traumaController.create)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(Trauma), idFilter.bodyIdRequired, idFilter.putIdsIdentical, traumaController.update)
    router.delete('/:id([0-9a-fA-F]{24})', traumaController.delete)
    router.get('/my-traumas', traumaController.readMine)
    router.get('/users/:userId([0-9a-fA-F]{24})', traumaController.readByUserId)

    return router
}
