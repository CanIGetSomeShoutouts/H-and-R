'use strict'

const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongo = require('./app/mongodb')
const mainRouter = require('./app/routes') //index.js by default
const configMongoDB = require('./config/mongodb.config')
const cookieParser = require('cookie-parser')


// enable cookie-parser
app.use(cookieParser())

// initialize dotenv
dotenv.config()

// set our port
const port = process.env.PORT || 8080

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// register routes
app.use(mainRouter)

// start mongo connection pool, then start express app
mongo.connect(process.env.MONGODB_URL)
    .then(() => configMongoDB(app))
    .then(() => app.listen(port))
    .then(() => console.log(`Magic happens on port: ${port}`))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })