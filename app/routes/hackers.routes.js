'use strict'

const router = require('express').Router()

const hackersControllerFactory = require('../controllers/hackers.controller')
const validateBody = require('../filters/validate.body')
const hacker = require('../models/hacker')

// NOTE: I think apiPrefix is the part in the url that is before the api endpoint (such as 'localhost:3000')
module.exports = apiPrefix => {
    const hackersController = hackersControllerFactory(apiPrefix)

// api routes ===========================================================
router.get('/', hackersController.read)
router.get('/:id([0-9a-fA-F]{24})', hackersController.readById)
router.post('/', validateBody(hacker), hackersController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(hacker), hackersController.update)
router.delete('/:id([0-9a-fA-F]{24})', hackersController.delete)

return router
}
