"use strict"

const router = require('express').Router()
const supportPostsControllerFactory = require('../controllers/support.posts.controller')
const validateBody = require('../filters/validate.body')
const SupportPost = require('../models/support.post')
const validateId = require('../filters/id.filter')

module.exports = apiPrefix => {
    const supportPostsController = supportPostsControllerFactory(apiPrefix)

    // api routes ===========================================================
    router.get('/', supportPostsController.read)
    router.get('/:id([0-9a-fA-F]{24})', supportPostsController.readById)
    router.post('/', validateBody(SupportPost), validateId.bodyIdDisallowed, supportPostsController.create)
    router.put('/:id([0-9a-fA-F]{24})', validateBody(SupportPost), validateId.bodyIdRequired, validateId.putIdsIdentical, supportPostsController.update)
    router.delete('/:id([0-9a-fA-F]{24})', supportPostsController.deactivate)
    router.get('/users/:id([0-9a-fA-F]{24})', supportPostsController.readByClientId) 
    
   return router
}