'use strict'
//imports
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

//export an object that makes this function available to some
//other code that's going to import this file
//node files always have to export this way 
module.exports = {
    read: read,
    readById: readById,
    create: create,
    update: update,
    delete: _deactivated,
    readPublished: _readPublished
}
function _readPublished() {
    return conn.db().collection('traumaTypes').find({ dateDeactivated: null, isDraft: null }).toArray()
        .then(traumaTypes => {
            for (let i = 0; i < traumaTypes.length; i++) {
                const traumaType = traumaTypes[i];
                traumaType._id = traumaType._id.toString()
                traumaType.userId = traumaType.userId.toString()
            }
            return traumaTypes
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
//looping through all of the documents returned by mongo
//for loop that sets up the variable that refers to the current item that it's working on 
//calls to strings on the _id property 
//read function returns the promise chain

function read(req, res) {
    //this is the get call
    //$mongo -checks if the property exists mongo operator has  = false, goes in find 
    //value filter using null
    //filtering for the delete request, find docs with null date deactivated , keeping name doesn't exist
    //find docs that don't have a date deac
    return conn.db().collection('traumaTypes').find({ dateDeactivated: null }).toArray().then(traumaArray => {
            for (let i = 0; i < traumaArray.length; i++) {
                let traumaObject = traumaArray[i]
                traumaObject._id = traumaObject._id.toString()
                traumaObject.userId = traumaObject.userId.toString()

            }
            return traumaArray
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
//same validation for readById
function readById(id) {
    return conn.db().collection('traumaTypes').findOne({ _id: new ObjectId(id) })
        .then(traumaType => {
            traumaType._id = traumaType._id.toString() //convert object Id back to string
            traumaType.userId = traumaType.userId.toString()

            return traumaType
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })

}

function create(model) {
    const safeDoc = {
        name: model.name,

        summary: model.summary,
        description: model.description,
        isDraft: model.isDraft,
        userId: new ObjectId(model.userId),
        dateCreated: new Date(),
        dateModified: new Date(),
        dateDeactivated: null
    }
    return conn.db().collection('traumaTypes').insertOne(safeDoc)
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

        name: model.name,
        summary: model.summary,
        description: model.description,
        isDraft: model.isDraft,
        dateModified: new Date()

    }

    return conn.db().collection('traumaTypes').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _deactivated(id) {
    // copy known properties - last line of defense
    //reps data that needs to be adjusted
    const safeDoc = {
        // convert string id used outside of MongoDB into ObjectId needed by MongoDB

        dateDeactivated: new Date(),
        dateModified: new Date()

    }

    return conn.db().collection('traumaTypes').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { console.log(result); return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
