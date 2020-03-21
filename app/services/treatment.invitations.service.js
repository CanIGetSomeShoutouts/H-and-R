"use strict"

const invites = require('../models/treatment.invitation')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: read,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function read() {
    return conn.db().collection('treatmentInvitations').find({ dateDeactivated: null }).toArray()
        .then(treatmentInvitations => {
            for (let i = 0; i < treatmentInvitations.length; i++) {
                let treatmentInvitation = treatmentInvitations[i]
                treatmentInvitation._id = treatmentInvitation._id.toString()
            }
            return treatmentInvitations
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readById(id) {
    return conn.db().collection('treatmentInvitations').findOne({ _id: new ObjectId(id), dateDeactivated: null })
        .then(treatmentInvitation => {
            treatmentInvitation._id = treatmentInvitation._id.toString()
            return treatmentInvitation
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function create(model) {
    const safeDoc = {
        firstName: model.firstName,
        lastName: model.lastName,
        userId: new ObjectId(model.userId),
        dateCreated: new Date(),
        dateModified: new Date(),
        dateExpire: model.dateExpire,
        username: model.username
    }
    if(model.username){
        safeDoc.username = model.username
    }else{
        safeDoc.email = model.email
    }
    return conn.db().collection('treatmentInvitations').insertOne(safeDoc)
        .then(result => result.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}


function update(id, model) {
    const safeDoc = {
        $set: {
            firstName: model.firstName,
            lastName: model.lastName,
            dateModified: new Date(),
            _id: new ObjectId(model._id)
        },
        $unset: {

        }
    }
    if(model.username){
        safeDoc.$set.username = model.username
        delete safeDoc.$set.email
        safeDoc.$unset.email = ""
    } else {
        safeDoc.$set.email = model.email
        safeDoc.$unset.username = ""
    }

    return conn.db().collection('treatmentInvitations').updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(result => { return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}


function _delete(id) {
    const safeDoc = {
        $set: {
            dateModified: new Date(),
            dateDeactivated: new Date()
        }
    }
    return conn.db().collection('treatmentInvitations').updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(response => {
            return response.matchedCount
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

