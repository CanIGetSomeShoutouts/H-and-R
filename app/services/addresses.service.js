"use strict"



const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: read,
    readByUserId: readByUserId,
    create: create,
    readById: readById,
    update: _update,
    delete: _delete
}


function read() {
    return conn.db().collection('addresses').find({ dateDeactivated: null }).toArray()
        .then(addresses => {
            for (let i = 0; i < addresses.length; i++) {
                let address = addresses[i]

                address._id = address._id.toString()
                address.userId = address.userId.toString()

            }
            return addresses
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readByUserId(userId) {
    return conn.db().collection('addresses').find({ dateDeactivated: null, userId: new ObjectId(userId) }).toArray()
        .then(addresses => {
            for (let i = 0; i < addresses.length; i++) {
                let address = addresses[i]
                address._id = address._id.toString()
                address.userId = address.userId.toString()
            }
            return addresses
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readById(id) {
    return conn.db().collection('addresses').findOne({ _id: new ObjectId(id) })
        .then(addresses => {
            addresses._id = addresses._id.toString()
            addresses.userId = addresses.userId.toString()
            return addresses
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function create(model) {
    const safeDoc = {
        dateCreated: new Date(),
        dateModified: new Date(),
        lineOne: model.lineOne,
        lineTwo: model.lineTwo,
        city: model.city,
        stateCode: model.stateCode,
        postalCode: model.postalCode,
        lat: model.lat,
        lon: model.lon,
        userId: new ObjectId(model.userId)
    }

    return conn.db().collection('addresses').insertOne(safeDoc)
        .then(result => result.insertedId.toString())
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _update(id, model) {
    const safeDoc = {

        $set: {
            _id: new ObjectId(model._id),
            dateModified: new Date(),
            lineOne: model.lineOne,
            lineTwo: model.lineTwo,
            city: model.city,
            stateCode: model.stateCode,
            postalCode: model.postalCode,
            lat: model.lat,
            lon: model.lon,
        }
    }

    return conn.db().collection('addresses').updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(result => result.matchedCount)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _delete(id, model) {
    const safeDoc = {
        $set:
            {
                dateDeactivated: new Date(),
                dateModified: new Date()
            }
    }
    return conn.db().collection('addresses').updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(result => { result.matchedCount })

        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}




