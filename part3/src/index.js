require('dotenv').config()
require('./database/mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use(cors())

// routes
app.get('/', (_, res) => res.send('<h2>Hi there, im a API</h2>'))
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// 404
app.use(notFound)

// handle error
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => console.log('Server on port', PORT))

module.exports = { app, server }
