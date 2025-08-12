const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

const app = express()

logger.info(`Server running on port ${config.PORT}`)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app