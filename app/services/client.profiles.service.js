"use strict"

const Profile = require('../models/client.profile')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: read,
    readById: readById,
    create: create,
    update: update,
    delete: _delete,
    readByUserId: _readByUserId
}

function read() {
    return conn.db().collection('clientProfiles').find({ dateDeactivated: null }).toArray()
        .then(profileArray => {
            for (let i = 0; i < profileArray.length; i++) {
                let profile = profileArray[i]
                profile._id = profile._id.toString()

                for (let b = 0; b < profileArray[i].bioViewerIds.length; b++) {
                    let bioViewerId = profileArray[i].bioViewerIds
                    bioViewerId[b] = bioViewerId[b].toString()
                }
            }
            return profileArray
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readById(id) {
    return conn.db().collection('clientProfiles').findOne({ _id: new ObjectId(id) })
        .then(profile => {
            profile._id = profile._id.toString()
            for (let i = 0; i < profile.bioViewerIds.length; i++) {
                let bioViewerId = profile.bioViewerIds
                bioViewerId[i] = bioViewerId[i].toString()
            }
            return profile
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readByUserId(id){
    return conn.db().collection('clientProfiles').findOne({ userId: new ObjectId(id)})
    .then(profile => {
        profile.userId = profile.userId.toString() 
        for (let i = 0; i < profile.bioViewerIds.length; i++) {
            let bioViewerId = profile.bioViewerIds
            bioViewerId[i] = bioViewerId[i].toString()
        }     
        return profile
    })
    .catch(err => {
        console.warn(err)
        return Promise.reject(err)
    })
}

function create(model) {
    const safeDoc = {
        userId: new ObjectId(model.userId),
        bio: model.bio,
        isBioPublic: model.isBioPublic,
        bioViewerIds: [],
        reason: model.reason,
        gender: model.gender,
        agreesToTerms: model.agreesToTerms,
        referralDescription: model.referralDescription,
        referralSource: model.referralSource,
        dateCreated: new Date(),
        dateModified: new Date(),
    }

    for (let bioViewerId of model.bioViewerIds) {
        safeDoc.bioViewerIds.push(new ObjectId(bioViewerId))
    }

    return conn.db().collection('clientProfiles').insertOne(safeDoc)
        .then(result => result.insertedId.toString()) //return generated Id as a string
        .catch(err => {
            console.log(err)
            return Promise.reject(err)

        })
}


function update(id, model) {
    const safeDoc = {
        bio: model.bio,
        isBioPublic: model.isBioPublic,
        bioViewerIds: [],
        reason: model.reason,
        gender: model.gender,
        agreesToTerms: model.agreesToTerms,
        referralDescription: model.referralDescription,
        referralSource: model.referralSource,
        dateModified: new Date(),
        _id: new ObjectId(model._id)
    }

    for (let bioViewerId of model.bioViewerIds) {
        safeDoc.bioViewerIds.push(new ObjectId(bioViewerId))
    }

    return conn.db().collection('clientProfiles').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
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
    return conn.db().collection('clientProfiles').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { console.log(result); return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}



