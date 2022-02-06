require('dotenv').config()
require('./src/database/mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./src/middlewares/notFound')
const handleErrors = require('./src/middlewares/handleErrors')
const usersRouter = require('./src/controllers/users')
const notesRouter = require('./src/controllers/notes')

app.use(express.json())
app.use(cors())

// routes
app.get('/', (req, res) => res.send('<h2>Hi there</h2>'))
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

// 404
app.use(notFound)

// handle error
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => console.log('Server on port', PORT))

module.exports = { app, server }
