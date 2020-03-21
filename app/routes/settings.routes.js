"use strict"

const router = require('express').Router()
const settingsControllerFactory = require('../controllers/settings.controller')

module.exports = apiPrefix => {
    const settingsController = settingsControllerFactory(apiPrefix)

    router.get('/', settingsController.read)   

    return router
}