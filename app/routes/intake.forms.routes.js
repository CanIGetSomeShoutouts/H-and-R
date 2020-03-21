"use strict"

const router = require('express').Router()
const intakeFormsApiPrefix = "api/intakeForms"
const intakeFormsControllerFactory = require('../controllers/intake.forms.controller')
const validateBody = require('../filters/validate.body')
const IntakeForm = require('../models/intake.form')
const validateUrl = require('../filters/id.filter')



module.exports = apiPrefix => {
    const intakeFormsController = intakeFormsControllerFactory(apiPrefix)

    // api routes ===========================================================
    router.get('/', intakeFormsController.read)
    router.get('/:id([0-9a-fA-F]{24})', intakeFormsController.readById)
    router.delete('/:id([0-9a-fA-F]{24})', intakeFormsController.delete)
    router.post('/', validateBody(IntakeForm), validateUrl.bodyIdDisallowed, intakeFormsController.create)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(IntakeForm), validateUrl.bodyIdRequired, validateUrl.putIdsIdentical, intakeFormsController.update)
    router.get('/users/:id([0-9a-fA-F]{24})', intakeFormsController.readByUserIdAndTherapistId)

    return router
}

