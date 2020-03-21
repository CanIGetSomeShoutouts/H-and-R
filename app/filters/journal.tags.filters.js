'use strict'

const responses = require('../models/responses')

module.exports = {
    maxMinEvenlyDivisible: function _maxMinEvenlyDivisible(req, res, next) {
        if ((req.model.severityMax - req.model.severityMin) % req.model.severityStep == !0) {
            res.status(400).send(new responses.ErrorResponse('Severity Max must be evenly divisible by Severity Step'))
            return
        }
        next()
    },
    alertEvenlyDivisible: function _alertEvenlyDivisible(req, res, next) {
        if (req.model.alertThreshold % req.model.severityStep == !0) {
            res.status(400).send(new responses.ErrorResponse('Alert Threshold must be evenly divisible by Severity Step'))
            return
        }
        next()
    }
}
