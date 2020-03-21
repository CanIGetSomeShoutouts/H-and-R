"use strict"
//this file makes the mongo client connect, runs only one time
const { MongoClient, ObjectId } = require('mongodb')

let _db = null

function connect(url) {
    if (_db !== null) { return Promise.resolve(_db) }

    return MongoClient.connect(url/* , { poolSize: 10 } */)
        .then(client => {
            let dbName = url.substr(url.lastIndexOf('/') + 1)
            _db = client.db(dbName)
        })
}

module.exports = {
    connect,
    connection: { db: () => _db },
    ObjectId
}
