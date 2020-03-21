'use strict'

// NOTE: This is where our backend stuff starts and we start importing and requiring it to the other files!

const Hacker = require('../models/hacker')
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
    return conn.db().collection('hackers').find().toArray()
        .then(hackers => {
            for (let i = 0; i < hackers.length; i++) {
                let hacker = hackers[i]
                hacker._id = hacker._id.toString() // convert ObjectId back to string
            }
            return hackers
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readById(id) {
    return conn.db().collection('hackers').findOne({ _id: new ObjectId(id) })
        .then(hacker => {
            hacker._id = hacker._id.toString() // convert ObjectId back to string
            return hacker
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function create(model) {
    const safeDoc = {
        name: model.name,
        userId: model.userId
    }
    return conn.db().collection('hackers').insertOne(safeDoc)
        .then(result => result.insertedId.toString()) // "return" generated Id as string
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function update(id, model) {
    // copy known properties - last line of defense
    const safeDoc = {
        // convert string id used outside of MongoDB into ObjectId needed by MongoDB
        _id: new ObjectId(model._id),

        name: model.name
    }

    return conn.db().collection('hackers').update( { _id: new ObjectId(id) }, safeDoc )
        .then(result => { console.log(result); return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _delete(id) {
    return conn.db().collection('hackers').deleteOne({ _id: new ObjectId(id) })
        // hide the mongodb result from callers
        .then(deleteResult => undefined)

        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
