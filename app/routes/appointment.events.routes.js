'use strict'

const router = require('express').Router()
const appointmentEventsApiPrefix = 'api/appointment-events'
const appointmentEventsControllerFactory = require('../controllers/appointment.events.controller')
const validateBody = require('../filters/validate.body')
const AppointmentEvent = require('../models/appointment.event')
const validateId = require('../filters/id.filter.js')


module.exports = apiPrefix => {
    const appointmentEventsController = appointmentEventsControllerFactory(apiPrefix)

    // API ROUTES====================================================
    router.get('/', appointmentEventsController.read)
    router.get('/:id([0-9a-fA-F]{24})', appointmentEventsController.readById)
    router.get('/user/:userId([0-9a-fA-F]{24})', appointmentEventsController.readByUserId)
    router.post('/', validateBody(AppointmentEvent), validateId.bodyIdDisallowed, appointmentEventsController.create)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(AppointmentEvent), validateId.bodyIdRequired, appointmentEventsController.update)
    router.delete('/:id([0-9a-fA-F]{24})', appointmentEventsController.delete)

    return router
}
