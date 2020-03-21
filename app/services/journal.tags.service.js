"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: _read,
    readById: _readById,
    readSiteWide: _readSiteWide,
    readByClientId: _readByClientId,
    create: _create,
    update: _update,
    delete: _delete
}

// Grabbing all journal tags then filtering if clientId is null
function _readSiteWide() {
    return conn.db().collection("journalTags").find({ dateDeactivated: null, clientId: null }).toArray()
        .then(tags => {
            for (let tag of tags) {
                tag._id = tag._id.toString()
                tag.iconId = tag.iconId.toString()
                tag.userId = tag.userId.toString()
            }
            return tags
        })
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}

// Grabbing all journal tags then filtering by specified id
function _readByClientId(clientId) {
    return conn.db().collection("journalTags").find({ dateDeactivated: null, clientId: new ObjectId(clientId) }).toArray()
        .then(tags => {
            for (let tag of tags) {
                tag._id = tag._id.toString()
                tag.iconId = tag.iconId.toString()
                tag.userId = tag.userId.toString()
                tag.clientId = tag.clientId.toString()
            }
            return tags
        })
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}

function _read() {
    return conn.db().collection("journalTags").find({ dateDeactivated: null }).toArray()
        .then(tags => {
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i]
                tag._id = tag._id.toString()
                tag.iconId = tag.iconId.toString()
                tag.userId = tag.userId.toString()
                if (tag.clientId) {
                    tag.clientId = tag.clientId.toString()
                }
            }
            return tags
        })
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}

function _readById(id) {
    return conn.db().collection("journalTags").findOne({ _id: new ObjectId(id) })
        .then(tag => {
            tag._id = tag._id.toString()
            tag.iconId = tag.iconId.toString()
            tag.userId = tag.userId.toString()
            if (tag.clientId) {
                tag.clientId = tag.clientId.toString()
            }
            return tag
        })
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}

function _create(payload) {
    const safeDoc = {
        name: payload.name,
        tagName: payload.tagName,
        type: payload.type,
        summary: payload.summary,
        severityMin: payload.severityMin,
        severityMax: payload.severityMax,
        severityStep: payload.severityStep,
        alertThreshold: payload.alertThreshold,
        iconId: new ObjectId(payload.iconId),
        dateCreated: new Date(),
        dateModified: new Date(),
        userId: new ObjectId(payload.userId)
    }

    if (payload.clientId) {
        safeDoc.clientId = new ObjectId(payload.clientId)
    } else {
        safeDoc.clientId = null
    }

    return conn.db().collection("journalTags").insertOne(safeDoc)
        .then(result => result.insertedId.toString())
        .catch(error => {
            if (error.code == 11000) {
                error.unique = false
            }
            console.error(error)
            return Promise.reject(error)
        })
}


function _update(id, payload) {
    const safeDoc = {
        _id: new ObjectId(payload._id),
        name: payload.name,
        tagName: payload.tagName,
        type: payload.type,
        summary: payload.summary,
        severityMin: payload.severityMin,
        severityMax: payload.severityMax,
        severityStep: payload.severityStep,
        alertThreshold: payload.alertThreshold,
        iconId: new ObjectId(payload.iconId),
        dateModified: new Date()
    }

    if (payload.clientId) {
        safeDoc.clientId = new ObjectId(payload.clientId)
    } else {
        safeDoc.clientId = null
    }

    return conn.db().collection("journalTags").updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { return result.matchedCount })
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}

function _delete(id) {
    const safeDoc = {
        dateDeactivated: new Date(),
        dateModified: new Date()
    }
    return conn.db().collection("journalTags").updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { return result.matchedCount })
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}
