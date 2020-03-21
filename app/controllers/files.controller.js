"use strict"

const responses = require('../models/responses')
const dotenv = require('dotenv')
const uuidv4 = require('uuid/v4')
const AWS = require('aws-sdk/clients/s3')
const S3 = new AWS()
S3.Config = {
    region: 'us-west-1',
    credentials: {
            //AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY need to be added as .env variables
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
}

module.exports = () => {
    return {
        sign: _sign,
        delete: _delete
    }
}


function _sign(req, res) {
    let url = `${process.env.S3_BUCKET_PATH}/${uuidv4()}` + encodeURIComponent(req.query.name)
    const config = {
        Bucket: process.env.S3_BUCKET,
        Key: url,
        ContentType: req.query.type
    }
    /*  
        Amazon S3 getSignedUrl function:
        takes config and AWS.Config and returns signedRequest 
        used as url for PUT request to Amazon S3 Storage
    */
    S3.getSignedUrl('putObject', config, (err, data) => {
        if (err) {
            console.warn(err)
            res.status(500).send(new responses.ErrorResponse(err))
            return
        }

        const signedData = {
            signed: data,
            url: `https://${config.Bucket}.s3.amazonaws.com/${config.Key}`,
            Bucket: config.Bucket
        }

        const responseModel = new responses.ItemResponse()
        responseModel.item = signedData
        res.status(200).send(responseModel)
    })
}

function _delete(req, res) {
    const config = {
        Bucket: process.env.S3_BUCKET,
        Key: req.params.name
    }
    S3.deleteObject(config, (err, data) => {
        if (err) {
            res.status(500).send(new responses.ErrorResponse(err))
        }
        else {
            const responseModel = new responses.ItemResponse()
            responseModel.item = data
            res.status(200).json(responseModel)
        }
    })
}

