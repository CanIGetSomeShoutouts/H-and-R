'use strict'

// NOTE: inside models contains Joi validation
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId // NOTE: Getting the ObjectId() constructor function to have ObjectId types

// Just get read function for now
module.exports = {
    readAll: _readAll,
    readById: _readById,
    create: _create,
    update: _update,
    deactivateData: _deactivateData
}

function _readAll() {
    return conn.db().collection('questionnaireResponses').find({ dateDeactivated: null }).toArray()
        .then(questionnaireResponses => {
            for (let i = 0; i < questionnaireResponses.length; i++) {
                let questionnaireResponse = questionnaireResponses[i]
                // converting ObjectId to string
                questionnaireResponse._id = questionnaireResponse._id.toString()
                questionnaireResponse.userId = questionnaireResponse.userId.toString()
                questionnaireResponse.questionnaireId = questionnaireResponse.questionnaireId.toString()
            }
            return questionnaireResponses
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(model) {
    // copy known properties - last line of defense
    const safeDoc = {
        userId: new ObjectId(model.userId),
        dateCreated: new Date(),
        dateModified: new Date(),
        questionnaireId: new ObjectId(model.questionnaireId),
        answers: []
    }

    // Verifying objects in model.answers[]
    for (let answer of model.answers) {
        const safeAnswer = {
            questionIndex: answer.questionIndex,
            text: answer.text,
            answerIndices: []
        }

        for (let answerIndex of answer.answerIndices) {
            let safeAnswerIndex = answerIndex
            safeAnswer.answerIndices.push(safeAnswerIndex)
        }
        safeDoc.answers.push(safeAnswer)
    }

    return conn.db().collection('questionnaireResponses').insertOne(safeDoc)
        .then(result => result.insertedId.toString()) // "return" generated Id as string
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readById(id) {
    return conn.db().collection('questionnaireResponses').findOne({ _id: new ObjectId(id) })
        .then(questionnaireResponse => {
            // convert ObjectId back to string
            questionnaireResponse._id = questionnaireResponse._id.toString()
            questionnaireResponse.userId = questionnaireResponse.userId.toString()
            questionnaireResponse.questionnaireId = questionnaireResponse.questionnaireId.toString()
            return questionnaireResponse
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err.message)
        })
}

function _update(id, model) {
    // copy known properties - last line of defense
    const safeDoc = {
        _id: new ObjectId(model._id),
        questionnaireId: new ObjectId(model.questionnaireId),
        dateModified: new Date(), // Add dateModified property
        answers: []
    }

    // Verifying objects in model.answers[]
    for (let answer of model.answers) {
        const safeAnswer = {
            questionIndex: answer.questionIndex,
            text: answer.text,
            answerIndices: []
        } 

        for (let answerIndex of answer.answerIndices) {
            let safeAnswerIndex = answerIndex
            safeAnswer.answerIndices.push(safeAnswerIndex)
        }
        safeDoc.answers.push(safeAnswer)
    }

    return conn.db().collection('questionnaireResponses').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => {
            return result.matchedCount
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

// Adds dateDeactivated property to mongo documents
function _deactivateData(id) {
    const safeDoc = {
        dateModified: new Date(),
        dateDeactivated: new Date()
    }
    return conn.db().collection('questionnaireResponses').updateOne({ _id: new ObjectId(id) }, { $set: safeDoc })
        .then(result => { return result.matchedCount })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}
