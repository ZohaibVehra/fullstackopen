const mongoose = require('mongoose')
const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')

const app = express()

mongoose.connect(config.URL)
  .then(() => logger.info('Connected to DB'))
  .catch(err => logger.error('error connecting to MongoDB', err.message))


app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
console.log(middleware.errorHandler)

module.exports = app