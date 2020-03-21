"use strict"

const SupportPost = require('../models/support.post')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    read: read,
    readById: readById,
    readByClientId: readByClientId,
    create: create,
    update: update,
    deactivate: _deactivate,

}

function read() {
    return conn.db().collection('supportPosts').find({ dateDeactivated: { $in: [null, false] } }).toArray()
        .then(posts => {
            for (let i = 0; i < posts.length; i++) {
                posts[i]._id = posts[i]._id.toString()
                posts[i].clientId = posts[i].clientId.toString()
                posts[i].userId = posts[i].userId.toString()
                for (let j = 0; j < posts[i].viewerIds.length; j++) {
                    posts[i].viewerIds[j] = posts[i].viewerIds[j].toString()
                }
            }
            return posts
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readById(id) {
    return conn.db().collection('supportPosts').findOne({ _id: new ObjectId(id) })   
        .then(post => {
            post._id = post._id.toString() // convert ObjectId back to string
            post.clientId = post.clientId.toString()
            post.userId = post.userId.toString()
            for (let i = 0; i < post.viewerIds.length; i++) {
                post.viewerIds[i] = post.viewerIds[i].toString()
            }
            return post
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function readByClientId(id, currentUserId) {
    return conn.db().collection('supportPosts').find({
            clientId: new ObjectId(id),
            dateDeactivated: null,
            $or: [
                { clientId: new ObjectId(currentUserId) },
                { viewerIds: new ObjectId(currentUserId) },
                { userId: new ObjectId (currentUserId)}
                //current user id should match user id -- auth should see post 
              
            ]
        }).toArray()
        .then(posts => {
            for (let i = 0; i < posts.length; i++) {
                posts[i]._id = posts[i]._id.toString()
                posts[i].clientId = posts[i].clientId.toString()
                posts[i].userId = posts[i].userId.toString()

                for (let j = 0; j < posts[i].viewerIds.length; j++) {
                    posts[i].viewerIds[j] = posts[i].viewerIds[j].toString()
                }
            }
            return posts
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function create(model) {
    for (let i = 0; i < model.viewerIds.length; i++) {
        model.viewerIds[i] = new ObjectId(model.viewerIds[i])
    }

    const safeDoc = {
        subject: model.subject,
        contentHtml: model.contentHtml,
        dateCreated: new Date(),
        dateModified: new Date(),
        clientId: new ObjectId(model.clientId),
        viewerIds: model.viewerIds,
        userId: new ObjectId(model.userId)
    }
    return conn.db().collection('supportPosts').insertOne(safeDoc)
        .then(result => result.insertedId.toString()) // "return" generated Id as string
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function update(id, model) {
    for (let i = 0; i < model.viewerIds.length; i++) {
        model.viewerIds[i] = new ObjectId(model.viewerIds[i])
    }
    const safeDoc = {
        $set: {
            dateModified: new Date(),
            subject: model.subject,
            contentHtml: model.contentHtml,
            viewerIds: model.viewerIds,
            _id: new ObjectId(model._id),
        }
    }

    return conn.db().collection('supportPosts').updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(result => { return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _deactivate(id) {
    const safeDoc = {
        $set: {
            dateDeactivated: new Date(),
            dateModified: new Date()
        }
    }

    return conn.db().collection('supportPosts').updateOne({ _id: new ObjectId(id) }, safeDoc)
        .then(result => result = undefined)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
