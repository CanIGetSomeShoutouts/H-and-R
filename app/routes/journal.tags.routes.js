"use strict"

const router = require('express').Router()
const journalTagsApiPrefix = "api/journal-tags"
const journalTagsControllerFactory = require('../controllers/journal.tags.controller')
const validateBody = require('../filters/validate.body')
const icon = require('../models/journal.tag.icon.uploader')
const tag = require('../models/journal.tag')
const idFilter = require('../filters/id.filter')
const tagsFilter = require('../filters/journal.tags.filters')
const multer = require('multer')
const multiValidate = multer({ storage: multer.memoryStorage() })
const adminFilter = require('../filters/auth.filters')

module.exports = apiPrefix => {
    const journalTagsController = journalTagsControllerFactory(apiPrefix)

    // api routes ===========================================================
    router.get('/', journalTagsController.read)
    router.get('/icons', journalTagsController.readIcons)
    router.get('/icons/:id([0-9a-fA-F]{24})', journalTagsController.readIconById)
    router.get('/:id([0-9a-fA-F]{24})', journalTagsController.readById)
    router.get('/site-wide', journalTagsController.readSiteWide)
    router.post('/', validateBody(tag), idFilter.bodyIdDisallowed, tagsFilter.maxMinEvenlyDivisible, tagsFilter.alertEvenlyDivisible, journalTagsController.create)
    router.post('/icons', multiValidate.single("file"), validateBody(icon), adminFilter.isAdmin, journalTagsController.createIcons)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(tag), idFilter.putIdsIdentical, idFilter.bodyIdRequired, tagsFilter.maxMinEvenlyDivisible, tagsFilter.alertEvenlyDivisible, journalTagsController.update)
    router.delete('/:id([0-9a-fA-F]{24})', journalTagsController.delete)

    return router
}
