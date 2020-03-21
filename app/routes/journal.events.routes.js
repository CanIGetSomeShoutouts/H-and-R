"use strict"

const router = require("express").Router()
const journalsControllerFactory = require("../controllers/journal.events.controller")
const validateBody = require("../filters/validate.body")
const Journal = require("../models/journal.event")
const idFilter = require("../filters/id.filter")

module.exports = apiPrefix => {
  const journalsController = journalsControllerFactory(apiPrefix)

  //api routes
  router.get("/", journalsController.read)
  router.get("/:id([0-9a-fA-F]{24})", journalsController.readById)
  router.post("/", validateBody(Journal), idFilter.bodyIdDisallowed, journalsController.create)
  router.put("/:id([0-9a-fA-F]{24})", validateBody(Journal), idFilter.bodyIdRequired, idFilter.putIdsIdentical, journalsController.update)
  router.delete("/:id([0-9a-fA-F]{24})", journalsController.deactivate)
  router.get('/my-journal', journalsController.readMyJournal)
  router.get('/user/:userId([0-9a-fA-F]{24})', journalsController.readByUserId)

  return router
}
