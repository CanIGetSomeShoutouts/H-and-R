const conn = require('../app/mongodb').connection

module.exports = configMongoDB

function configMongoDB(app) {
    return Promise.all(
        [
            conn.db().ensureIndex('invites', { inviteName: 1 }, { unique: 1 }),
            conn.db().createIndex('users', { username: 1 }, { unique: true }),
            conn.db().createIndex('journalTags', { tagName: 1 }, { unique: true }),
            conn.db().createIndex('users', {email: 1}, {unique: true})
            // conn.db().createIndex('widgets', { sku: 1 }, { unique: 1 })
        ]
    )
}