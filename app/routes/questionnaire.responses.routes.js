// NOTE: module.export-ing our router through express

'use strict'

const router = require('express').Router()
const questionnaireControllerFactory = require('../controllers/questionnaire.responses.controller')

// Validations
const validateBody = require('../filters/validate.body')
const validateId = require('../filters/id.filter')
const questionnaire = require('../models/questionnaire.responses')

module.exports = apiPrefix => {
    const questionnaireController = questionnaireControllerFactory(apiPrefix)

    // api routes ===========================================================
    // NOTE: validateBody is where we get rid of req.body and substitue it with req.model.  Most of the validations are dependent to req.model
    router.get('/', questionnaireController.readAll)
    router.get('/:id([0-9a-fA-F]{24})', questionnaireController.readById)
    router.post('/', validateBody(questionnaire), validateId.bodyIdDisallowed, questionnaireController.create)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(questionnaire), validateId.bodyIdRequired, validateId.putIdsIdentical, questionnaireController.update)
    router.delete('/deactivate/:id([0-9a-fA-F]{24})', questionnaireController.deactivateData)
    return router
}
