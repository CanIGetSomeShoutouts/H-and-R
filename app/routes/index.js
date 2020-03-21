// NOTE: Have to add new routes in here (This is where we export ALL the route's and backend functions)

"use strict"

const express = require('express')
const router = express.Router()

// Api Prefixes
const appointmentEventsApiPrefix = '/api/appointment-events'
const addressesApiPrefix = '/api/addresses'
const clientProfileApiPrefix = '/api/client-profiles'
const hackersApiPrefix = '/api/hackers'
const intakeFormsApiPrefix = '/api/intake-forms'
const questionnairesApiPrefix = '/api/questionnaires'
const questionnaireResponsesApiPrefix = '/api/questionnaire-responses'
const supportPostsApiPrefix = '/api/support-posts'
const traumaPostsApiPrefix = '/api/traumas'
const invitesApiPrefix = '/api/treatment-invitations'
const journalTagsApiPrefix = "/api/journal-tags"
const journalsApiPrefix = "/api/journal-events"
const traumaTypesApiPrefix = '/api/trauma-types'
const usersApiPrefix = '/api/users'
const filesApiPrefix = '/api/files'
const supportInvitationsApiPrefix = '/api/support-invitations'
const settingsApiPrefix = '/api/settings'


// Pages Routes
const appointmentEventRoutes = require('./appointment.events.routes')(appointmentEventsApiPrefix)
const invitesRoutes = require('./treatment.invitations.routes')(invitesApiPrefix)
const addressesRoutes = require('./addresses.routes')(addressesApiPrefix)
const clientProfileRoutes = require('./client.profiles.routes')(clientProfileApiPrefix)
const hackersRoutes = require('./hackers.routes')(hackersApiPrefix)
const intakeFormsRoutes = require('./intake.forms.routes')(intakeFormsApiPrefix)
const journalsRoutes = require("./journal.events.routes")(journalsApiPrefix)
const journalTagsRoutes = require("./journal.tags.routes")(journalTagsApiPrefix)
const questionnairesRoutes = require('./questionnaires.routes')(questionnairesApiPrefix)
const questionnaireResponsesRoutes = require('./questionnaire.responses.routes')(questionnaireResponsesApiPrefix)
const supportPostsRoutes = require('./support.posts.routes')(supportPostsApiPrefix)
const traumaPostsRoutes = require('./traumas.routes')(traumaPostsApiPrefix)
const traumaTypesRoutes = require('./trauma.types.routes')(traumaTypesApiPrefix)
const usersRoutes = require('./users.routes')(usersApiPrefix)
const filesRoutes = require('./files.routes')(filesApiPrefix)
const supportInvitationRoutes = require('./support.invitations.routes')(supportInvitationsApiPrefix)
const settingsRoutes = require('./settings.routes')(settingsApiPrefix)

// Misc require
const clientRoutes = require("./client.routes")
const authenticate = require("../filters/authenticate")
const path = require("path")
const contentPath = path.join(__dirname, "../../content")

module.exports = router
router.use(express.static(contentPath))

// check authentication for all requests
router.use(authenticate)

// API routes (group routing modules here - no empty lines between)

// API routes (group routing modules here - no empty lines between)
// router.use('/api/entities', entitiesRoutes)
// router.use(examplesApiPrefix, examplesRoutes)
router.use(appointmentEventsApiPrefix, appointmentEventRoutes)
router.use(clientProfileApiPrefix, clientProfileRoutes)
router.use(hackersApiPrefix, hackersRoutes)
router.use(invitesApiPrefix, invitesRoutes)
router.use(intakeFormsApiPrefix, intakeFormsRoutes)
router.use(supportPostsApiPrefix, supportPostsRoutes)
router.use(traumaPostsApiPrefix, traumaPostsRoutes)
router.use(journalsApiPrefix, journalsRoutes)
router.use(journalTagsApiPrefix, journalTagsRoutes)
router.use(questionnairesApiPrefix, questionnairesRoutes)
router.use(questionnaireResponsesApiPrefix, questionnaireResponsesRoutes)
router.use(addressesApiPrefix, addressesRoutes)
router.use(traumaTypesApiPrefix, traumaTypesRoutes)
router.use(usersApiPrefix, usersRoutes)
router.use(filesApiPrefix, filesRoutes)
router.use(supportInvitationsApiPrefix, supportInvitationRoutes)
router.use(settingsApiPrefix, settingsRoutes)

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router)

// register client routes
router.use(clientRoutes)

function useAPIErrorHandlers(router) {
    // Handle API 404
    router.use("/api/*", (req, res, next) => {
        res.sendStatus(404)
    })

    // Handle API 500
    router.use((err, req, res, next) => {
        if (!err) {
            return next()
        }

        // Log it
        console.log(err.stack)

        // Redirect to error page
        res.sendStatus(500)
    })
}
