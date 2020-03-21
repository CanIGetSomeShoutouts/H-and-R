'use strict'

const AppointmentEvent = require('../models/appointment.event')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: read,
    readById: readById,
    readByUserId: readByUserId,
    create: create,
    update: update,
    delete: _delete,
}

function read() {
    return conn.db().collection('appointmentEvents').find({ dateDeactivated: null }).toArray()
        .then(appointmentEvents => {
            for (let i = 0; i < appointmentEvents.length; i++) {
                const appointmentEvent = appointmentEvents[i];
                appointmentEvent._id = appointmentEvent._id.toString()
                appointmentEvent.userId = appointmentEvent.userId.toString()
            }
            return appointmentEvents
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readById(id) {
    return conn.db().collection('appointmentEvents').findOne({ _id: new ObjectId(id) })
        .then(appointmentEvent => {
            appointmentEvent._id = appointmentEvent._id.toString()
            appointmentEvent.userId = appointmentEvent.userId.toString()

            return appointmentEvent
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readByUserId(id, therapistId) {
    let query
    if (therapistId === "undefined") {
        query = { participantIds: new ObjectId(id) }
    }
    else {
        query = { participantIds: { $all: [new ObjectId(id), new ObjectId(therapistId)] } }
    }
    return conn.db().collection('appointmentEvents').find(query).toArray()
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                const user = response[i]
                user._id = user._id.toString()
                user.userId = user.userId.toString()
                for (let j = 0; j < user.participantIds.length; j++) {
                    const supporter = user.participantIds
                    supporter[j] = supporter[j].toString()
                }
            }
            return response
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function create(model) {

    let participantIdsStringList = []
    let pIds = model.participantIds
    for (let i = 0; i < pIds.length; i++) {
        participantIdsStringList.push(new ObjectId(pIds[i]))
    }

    const safeDoc = {
        _id: new ObjectId(model._id),
        userId: new ObjectId(model.userId),
        addressId: new ObjectId(model.addressId),
        title: model.title,
        description: model.description,
        participantIds: participantIdsStringList,
        date: model.date,
        teleconferenceInfo: model.teleconferenceInfo,
        dateCreated: new Date(),
        dateModified: new Date(),
        dateDeactivated: null
    }
    return conn.db().collection('appointmentEvents').insertOne(safeDoc)
        .then(result => result.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function update(id, model) {
    let participantIdsStringList = []
    let pIds = model.participantIds
    for (let i = 0; i < pIds.length; i++) {
        participantIdsStringList.push(new ObjectId(pIds[i]))
    }

    const safeDoc = {
        _id: new ObjectId(model._id),
        title: model.title,
        description: model.description,
        participantIds: participantIdsStringList,
        date: model.date,
        teleconferenceInfo: model.teleconferenceInfo,
        addressId: model.addressId,
        dateModified: new Date()
    }

    return conn.db().collection('appointmentEvents').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _delete(id) {
    const safeDoc = {
        dateDeactivated: new Date(),
        dateModified: new Date()
    }
    return conn.db().collection('appointmentEvents').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { return result.matchedCount })

        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
