require('dotenv').config()
require('./src/database/mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./src/models/Note')
const notFound = require('./src/middlewares/notFound')
const handleErrors = require('./src/middlewares/handleErrors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h2>Hi there</h2>')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({})

  try {
    res.json(notes)
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then(note => {
      if (note) return res.json(note)
      res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req, res) => {
  const { body } = req
  const { content, important } = body

  if (!body || !content) {
    return res.status(400).json({
      error: true,
      message: 'no content, check and try again'
    })
  }

  const newNote = new Note({
    content,
    important: typeof important !== 'undefined' ? important : false,
    date: new Date().toISOString()
  })

  newNote.save()
    .then(result => res.status(201).json(result))
    .catch(error => console.error(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const { content, important } = body

  if (!body || Object.keys(body).length === 0) return res.status(400).end()
  if (content !== undefined && (content === '' || content === null)) res.status(400).end()
  if (important !== undefined && !important) return res.status(400).end()

  Note.findByIdAndUpdate(id, body, { new: true })
    .then(changedNote => {
      if (changedNote) return res.json(changedNote)
      res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndDelete(id)
    .then(note => {
      if (note) return res.status(204).end()
      res.status(404).end()
    })
    .catch(error => next(error))
})

// 404
app.use(notFound)

// handle error
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => console.log('Server on port', PORT))

module.exports = { app, server }
