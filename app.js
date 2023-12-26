//Dependencies
const express = require('express')
const apiRouter = require('./src/routes/api')
const mongoose = require('mongoose')
const app = express()

//Security middleware import
const cors = require('cors')
const helmet = require('helmet')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const sanitizePlugin = require('express-mongo-sanitize')

//Security middleware implimentation
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(sanitizePlugin())
//Set rate limiting
const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 100,
    message: "Rate limit exceed try again later",
    statusCode: 429,
    headers:true
})
app.use(limiter)

//Body parser middleware
app.use(express.json())

//  Connet to MongoDB Database
let URI = "mongodb+srv://demoDatabase:1234@cluster0.gdvqevi.mongodb.net/AssignmentEcommerce"

let OPTION = {autoIndex: true}
mongoose
        .connect(URI, OPTION)
        .then(() => {
            console.log("Database Connected!")
        })
        .catch((err) => console.log(err))

//Routing
app.use('/api', apiRouter)

// Undefined route (It should be the last that means after the main routing file. if do not match any route then undefined route will act.)
app.use("*", (req, res) => {
    res.status(404)
    res.json({"status": "Failed", "data": "Not Found!"})
})

  
module.exports = app;