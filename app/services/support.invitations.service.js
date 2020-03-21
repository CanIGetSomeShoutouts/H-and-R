'use strict'

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: read,
    readById: readById,
    create: create,
    delete: _delete
}

function read() {
    return conn.db().collection('supportInvitations').find({ dateDeactivated: null }).toArray()
        .then(invitations => {
            for (let i = 0; i < invitations.length; i++) {
                let invitation = invitations[i]
                invitation._id = invitation._id.toString()
            }
            return invitations
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readById(id) {
    return conn.db().collection('supportInvitations').findOne({ _id: new ObjectId(id), dateDeactivated: null })
        .then(invite => {
            invite._id = invite._id.toString()
            invite.userId = invite.userId.toString()

            return invite
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function create(model) {
    const safeDoc = {
        userId: new ObjectId(model.userId),
        username: model.username,
        email: model.email,
        dateCreated: new Date(),
        dateModified: new Date(),
        dateDeactivated: null
    }
    if (model.username) {
        safeDoc.username = model.username
    } else {
        safeDoc.email = model.email
    }
    return conn.db().collection('supportInvitations').insertOne(safeDoc)
        .then(result => result.insertedId.toString())
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
    return conn.db().collection("supportInvitations").updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { return result.matchedCount })
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}