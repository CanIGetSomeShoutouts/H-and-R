"use strict"

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId
const Binary = require('mongodb').Binary

module.exports = {
    readIcons: _readIcons,
    read: _read,
    createIcons: _createIcons
}

function _readIcons() {
    return conn.db().collection("journalTagIcons").find().toArray()
        .then(icons => {
            for (let i = 0; i < icons.length; i++) {
                let icon = icons[i]
                icon._id = icon._id.toString()
                let a = new Buffer(icon.data.value(), 'binary')
                let b = a.toString('base64')
                icon.data = b
            }
            return icons
        })
        .catch(error => {
            return Promise.reject(error)
        })
}

function _read(IconId) {
    return conn.db().collection("journalTagIcons").findOne({ _id: new ObjectId(IconId) })
        .then(icon => {
            icon._id = icon._id.toString()

            // Convert binary data to string data
            icon.data = new Buffer(icon.data.value(), "binary").toString("base64")

            return icon
        })
        .catch(error => {
            return Promise.reject(error)
        })
}

function _createIcons(payload) {

    const safeDoc = {
        set: payload.set,
        name: payload.name,
        data: new Binary(payload.data)
    }

    return conn.db().collection("journalTagIcons").insertOne(safeDoc)
        .then(result => result.insertedId.toString())
        .catch(error => {
            console.error(error)
            return Promise.reject(error)
        })
}
