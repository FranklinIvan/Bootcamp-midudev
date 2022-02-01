require('dotenv').config()
require('./src/database/mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./src/models/Note')

app.use(express.json())
app.use(cors())

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>hi there</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => res.json(notes))
    .catch(error => {
      console.error(error)
      res.status(404).end()
    })
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params

  Note.findById(id)
    .then(note => {
      if (note) return res.json(note)
      else res.status(404).end()
    })
    .catch(error => {
      console.error(error)
      res.status(400).end()
    })
})

app.post('/api/notes', (req, res) => {
  const { body } = req

  if (!body || !body.content) {
    return res.status(400).json({
      error: true,
      message: 'no note, check and try again'
    })
  }

  const newNote = new Note({
    content: body.content,
    important: typeof body.important !== 'undefined' ? body.important : false,
    date: new Date().toISOString()
  })

  newNote.save()
    .then(result => res.status(201).json(result))
    .catch(error => console.error(error))
})

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  notes = notes.map(note => note.id !== id ? note : changedNote)

  if (changedNote) res.json(changedNote)
  else res.status(400).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params

  Note.findByIdAndDelete(id)
    .then(note => {
      if (note) {
        return res.json({
          message: 'successfully removed',
          note
        })
      } else res.status(404).end()
    })
    .catch(error => {
      console.error(error)
      res.status(400).end()
    })
})

app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => console.log('Server on port', PORT))
