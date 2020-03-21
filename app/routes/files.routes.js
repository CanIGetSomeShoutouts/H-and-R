"use strict"

const router = require('express').Router()
const filesControllerFactory = require('../controllers/files.controller')

module.exports = apiPrefix => {
    const filesController = filesControllerFactory(apiPrefix)
    
    router.get('/sign', filesController.sign)
    router.delete('/delete/:name', filesController.delete)
    return router
}
