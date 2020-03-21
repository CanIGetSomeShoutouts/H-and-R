"use strict"

const responses = require('../models/responses')
const invitesService = require('../services/treatment.invitations.service')
const emailsService = require('../services/emails.service')
const usersService = require('../services/users.service')
let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix
    return {
        read: _read,
        delete: _delete,
        readById: _readById,
        create: _create,
        update: _update,
        confirmTreatment: _confirmTreatment
    }
}

function _read(req, res) {
    invitesService.read()
        .then(therapistInvites => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = therapistInvites
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _readById(req, res) {
    invitesService.readById(req.params.id)
        .then(therapistInvites => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = therapistInvites
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _create(req, res) {
    let fromName, toName, toAddress, inviteId
    const responseModel = new responses.ItemResponse()
    const dateExpire = new Date()
    dateExpire.setDate(dateExpire.getDate() + 14)
    req.model.dateExpire = dateExpire
    req.model.userId = req.auth.userId

    //Get sender info
    usersService.readById(req.model.userId)
        .then(client => {
            fromName = `${client.firstName} ${client.lastName}`
            toName = `${req.model.firstName} ${req.model.lastName}`
            toAddress = req.model.email
            //Create Treatment Invitation
            return invitesService.create(req.model)
        })
        .then(id => {
            inviteId = id
            //Send Email Invitation
            return emailsService.sendInvite(fromName, toName, toAddress, inviteId)
        })
        .then(response => {
            responseModel.item = inviteId
            res.status(201)
                .location(`${_apiPrefix}/${inviteId}`)
                .json(responseModel)

        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _confirmTreatment(req, res) {
    let therapistId
    invitesService.readById(req.model.id)
        .then(invitation => {

            therapistId = invitation.userId
            return usersService.readById(req.auth.userId)
        })
        .then(userUpdate => {
            userUpdate.supporterIds.push(therapistId)
            return usersService.update(userUpdate._id, userUpdate)
        })
        .then(response => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _update(req, res) {
    invitesService
        .update(req.params.id, req.model)
        .then(therapistInvites => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    invitesService.delete(req.params.id)
        .then(therapistInvites => {
            const responseModel = new responses.ItemResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}
