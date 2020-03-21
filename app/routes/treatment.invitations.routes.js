"use strict"

const router = require('express').Router()
const invitesControllerFactory = require('../controllers/treatment.invitations.controller')
const validateBody = require('../filters/validate.body')
const invite = require('../models/treatment.invitation')
const validateId = require('../filters/id.filter')
const treatmentInvitationsFilters = require('../filters/invitations.filters')
const confirmTreatment = require('../models/confirm.treatment.invitation')

module.exports = apiPrefix => {
    const invitesController = invitesControllerFactory(apiPrefix)

    router.get('/', invitesController.read)
    router.post('/', validateBody(invite), validateId.bodyIdDisallowed, treatmentInvitationsFilters.resolveUser, invitesController.create)
    router.post('/confirm', validateBody(confirmTreatment), invitesController.confirmTreatment)
    router.get('/:id([0-9a-fA-F]{24})', invitesController.readById)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(invite), validateId.bodyIdRequired, validateId.putIdsIdentical, treatmentInvitationsFilters.resolveUser, invitesController.update)
    router.delete('/:id([0-9a-fA-F]{24})', invitesController.delete)
    return router
}